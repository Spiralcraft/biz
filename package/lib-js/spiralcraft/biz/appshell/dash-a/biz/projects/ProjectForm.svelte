<script>
  import { getContext } from "svelte";
  import AbstractCRUDForm from "@vfs/app/components/AbstractCRUDForm.svelte";
  
  import {FormField, TextInput, CheckInput, SelectInput, Errors} from '@vfs/app/form/form.js';
  
  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte';  

  //  import createValidator from "./customerValidator";

  const biz=getContext("biz");

  const initial = { id: "", name: "" };
  const title = "Project";
  const validator=undefined;
  const dataView=biz.projectView;
  const customerView=biz.customerView;
  const trackerModelView=biz.trackerModelView;
  const trackerView=biz.trackerView;

  
  const cleanEdited = (values) => values;
  
  export let create;
  export let embedded=false;
  
  let customers=[];
  
  const dataController = getContext("DataController");

  const props = 
  { initial,
    title,
    validator,
    dataView,
    create,
    embedded,
    cleanEdited,
  }
  
  const refreshCustomers = customerView.showAll( (data) => { customers=data } );

  const refreshTrackerModel = (id) => trackerModelView.showForPkey(id, (data) => { trackerModel=data } );

  
  let trackerModel;
  
  const key = dataController.key;
  

  const updateStatus = (callback,params) => 
  { 
    let project=params.project;
    let status=params.status;
    project.currentRun.tracker.status=status;
    project.currentRun.tracker.statusId=status.id;
    console.log("UpdateStatus "+project.currentRun.tracker.id+":"+status.id);
    
    trackerView.edited
      (project.currentRun.tracker
      ,(data) => 
        {
          project.currentRun.tracker=data;
          dataController.onSave(project);
          callback(project);
        }
      );
    
  }

  const startRun = (callback) => 
    dataView.call($key
      ,"startRun"
      ,{}
      ,(data) => 
        { 
          dataController.onSave(data);
          callback(data);
        }
      );
    
  const resetRun = (callback) => 
    dataView.call($key
      ,"resetRun"
      ,{}
      ,(data) => 
        { 
          data.currentRun=null;
          dataController.onSave(data);
          callback(data);
        }
      );


</script>

<AbstractCRUDForm 
  {...props}
  let:errors
  let:values
  let:editEnabled
  let:create
  let:doAction
  >
  
  <FormField path="name">
    <TextInput
      name="name"
      label="Name"
      placeholder="Project Name"
    />
  </FormField>
  <FormField path="customerId">
    <SelectInput
      name="customerId"
      label="Customer"
      placeholder="Select a Customer"
      let:selected
      on:focus={ refreshCustomers }
      >
      <option>-------</option>
      {#each customers as customer} 
          <option selected={selected === customer.id} value={customer.id}>{customer.name}
          </option>
      {/each}
    </SelectInput>
  </FormField>
  {#if !editEnabled && !values.currentRun}
    <div class="form-field d-flex flex-row align-items-center">
      <button type="button" class="btn btn-success col3 col2-sm flex-shrink-0 flex-grow-0"
        on:click|preventDefault={doAction(startRun,{reset:true})}>Start run
      </button>
      <span class="col9 col10-sm ms-3">Begin pre-production tracking</span>
    </div>
  {/if}
  {#if !editEnabled 
        && values.currentRun 
        && values.currentRun.tracker 
        }
    <div class="form-field d-flex flex-row align-items-center mb-3 dropdown">
      <button data-bs-toggle="dropdown" aria-expanded="false" type="button"
        class="status-button btn btn-secondary dropdown-toggle dropdown-toggle-split p-0 pe-1"
        on:click={(e)=>refreshTrackerModel(values.currentRun.tracker.modelId)}
        >
        <TrackerStatusWidget
          status={values.currentRun.tracker.status} 
          classes="me-1 rounded-1"
        />
      </button>
      <ul class="dropdown-menu status-menu" aria-labelledby="status-dropdown">
      {#if trackerModel}
          {#each trackerModel.statusSet as status}
            <li>
              <a class="dropdown-item status-select-item" href="/#" 
                title="{status.description}"
                on:click|preventDefault=
                  {doAction
                    ( updateStatus,
                      { reset:true,
                        params: {project: values, status: status }
                      }
                    )
                  }
                >
                <TrackerStatusWidget status={status}/>
              </a>
            </li>
          {/each}
      {/if}
      </ul>
      <span class="col9 col10-sm ms-3">Tracker status.</span>
    </div>
  {/if}
  
  {#if !editEnabled 
        && values.currentRun 
        && ( !values.currentRun.tracker 
             || !values.currentRun.tracker.status
             || !values.currentRun.tracker.status.id
           )
    }
    <div class="form-field d-flex flex-row align-items-center mb-3">
      <button type="button" class="btn btn-warning col3 col2-sm flex-shrink-0 flex-grow-0"
        on:click|preventDefault={doAction(resetRun,{reset:true})}>Reset run
      </button>
      <span class="col9 col10-sm ms-3">Reset this run</span>
    </div>
  {/if}
</AbstractCRUDForm>

<style>
.status-button, .status-select-item
{
  font-size: var(--text-md);
}
.status-menu
{ min-width: 8rem;
}
</style>