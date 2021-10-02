<script>
  import { getContext, onMount, onDestroy } from "svelte";
  import { derived } from "svelte/store";
  
  import SoloActivityPanel from "@vfs/app/layout/SoloActivityPanel.svelte";
  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte';
  import TrackerComponentTable from '@vfs/app/biz/trackers/TrackerComponentTable.svelte';
  import TrackerDetailPanel from '@vfs/app/biz/trackers/TrackerDetailPanel.svelte';
  import Modal from '@spiralcraft/svelte/modal/Modal.svelte';
  
  
  export let embedded=true;
  
  const app=getContext("App");
  const biz=getContext("biz");

  const PlayCircleIcon = app.icons["playCircle"];
  const TrashIcon = app.icons["trash"];
  const XSquareIcon=app.icons["xSquare"];
  const EditIcon=app.icons["edit"];
  
  const projectView=biz.projectView;
  const dataController=getContext("DataController");
  const key=dataController.key;
  const dataStore=derived(key,async ($key,set) => 
    {
      projectView.showForPkey($key,(data) => { set(data) });
    });
  
  const trackerModelView=biz.trackerModelView;
  const trackerView=biz.trackerView;
  const emptyStatus={ id:"00", label: "", color: "#CCCCCC", description: "No status" };
  const noStatus=emptyStatus;
  
  let defaultRunType=biz.custom.pm.run.defaultRunType;
  if (!defaultRunType)
  { defaultRunType="basic";
  }  
  let selectedRunType=defaultRunType;
  
  let canReset=false;
  let title="";
  let project=null;
  let tracking=false;
  let status=noStatus;

  let trackerUpdateModal;
  let modalActive;
  
  let scatter = (data) =>
  {
    console.log("Project is "+JSON.stringify(project));
    project=data;
    if (project)
    {
      title = "Project: "+project.name;
               
      if (
         project.currentRun 
           && ( !project.currentRun.tracker 
                || !project.currentRun.tracker.status
                || !project.currentRun.tracker.status.id
              )
         ) 
      { canReset=true; 
      } 
      else 
      { canReset=false; 
      }
      
      if (project.currentRun 
           && project.currentRun.tracker
         )
      { 
        tracking=true;
        status=project.currentRun.tracker.status;
        if (!status || !status.id)
        { status=noStatus;
        }
        refreshTrackerModel(project.currentRun.tracker.modelId);
      }
      else
      { 
        tracking=false;
        status=noStatus;
        trackerModel=null;
      }
      
      console.log("Title "+title+" canReset "+canReset
          +" tracking "+tracking+" status "+JSON.stringify(status)
          );          
    }
  }
  
  const startRun = () => 
    projectView.call($key
      ,"startRun"
      ,{ runType: selectedRunType
       }
      ,(data) => 
        { 
          dataController.onSave(data);
          scatter(data);
        }
      );
    
  
  const resetRun = () => 
    projectView.call($key
      ,"resetRun"
      ,{}
      ,(data) => 
        { 
          data.currentRun=null;
          dataController.onSave(data);
          scatter(data);
        }
      );
      
  let trackerComponentChanged = () =>
  { 
    dataController.onSave(project);
    scatter(project);
  }

  let trackerModels;
  
  let trackerModel;
  const refreshTrackerModel = (id) => {
      console.log("Refreshing tracker "+id);
      trackerModelView.showForPkey(id, (data) => { trackerModel=data } );
    }

  let unsub;
  onMount(() => 
    { 
      unsub=dataStore.subscribe(scatter);
      trackerModelView.showAll((data) => { trackerModels=data; });
    }
  );
  
  onDestroy(() => { if (unsub) { unsub() } });
  
  
  function trackerUpdated(tracker)
  {
    console.log("Tracker updated "+JSON.stringify(tracker));
    project.currentRun.tracker=tracker;
    status=tracker.status;
    dataController.onSave(project);
    scatter(project);
  }
    
  function editAction()
  {
    modalActive = "update";
    trackerUpdateModal.show
      ({ tracker: project.currentRun.tracker,
       }
      );
  }  
</script>
<SoloActivityPanel hasTitle={false} border={embedded?"none":"top"}>
  <div class="d-flex flex-row align-items-center" slot="header-controls">
    {#if canReset}  
      <button 
        type="button" 
        class="pb-2 btn btn-sm btn-warning col3 col2-sm flex-shrink-0 flex-grow-0"
        label="Reset run and discard progress"
        on:click|preventDefault={ (e)=> { resetRun() } }><TrashIcon size="1.25x"/>
      </button>
    {/if}
  </div>
  <div class="h-100 overflow-auto d-flex flex-column">
    {#if project}
      {#if !project.currentRun}
        <h6>Start a new run:</h6>
        <div class="d-flex flex-row align-items-center">
          <button type="button" class="pb-2 btn btn-sm btn-success col3 col2-sm flex-shrink-0 flex-grow-0"
            on:click|preventDefault={startRun}><PlayCircleIcon size="1.25x"/>
          </button>
          {#if trackerModels}
            <span class="col9 col10-sm ms-3">
              <select class="form-select run-type-selector" bind:value={selectedRunType}>
                {#each trackerModels as trackerModel }
                  <option value="{trackerModel.name}" title="{trackerModel.description}">{trackerModel.name}</option>
                {/each}
              </select>
            </span>
          {/if}
        </div>
      {/if}
      {#if tracking}
        <h6>Run: {project.currentRun.name} : {trackerModel?trackerModel.name:""}</h6>
        {#if trackerModel && trackerModel.description}
        <p>{trackerModel.description}</p> 
        {/if}
        <div class="run-status-header d-flex flex-row">
          <div class="fw-500 fs-6">Status</div>
        </div>
        <div class="d-flex flex-row align-items-center mb-3 ps-2">
          <button type="button"
            class="status-button btn p-0"
            on:click|preventDefault={ editAction }
            >
            <TrackerStatusWidget
              status={status} 
              classes="rounded-1"
              >
              <EditIcon size="1x" slot="icon"/>
            </TrackerStatusWidget>
          </button>
          <span class="col9 col10-sm ms-3">{status.description}</span>
        </div>
        <TrackerComponentTable 
          contextInfo={ [{ label:"Project", text: project.name }] }
          details={project.currentRun.tracker.components}
          onChange={trackerComponentChanged}
        />
      {/if}
    {/if}
  </div>
</SoloActivityPanel>

<Modal bind:this={trackerUpdateModal} let:options>
  <div slot="modal-header" let:close class="d-flex flex-row tracker-modal-header p-1">
    <div class="title-container fw-500 fs-6 d-inline-block">
      Master Tracker Detail
    </div>
    <a class="modal-close-button d-inline-block ms-auto" 
      href={"#"} title="Close" on:click|preventDefault={ close }
      >
      <XSquareIcon size="1.5x"/>
    </a>
  </div>
  <TrackerDetailPanel contextInfo={ [{ label:"Project", text: project.name }] } 
    {options} updated={trackerUpdated} active={modalActive}
  />
</Modal>

<style>
.status-button,  .run-type-selector
{
  font-size: var(--text-md);
}

.component-edit-icon
{ 
  position: relative;
  top: 0;
  left: 0;
}

</style>