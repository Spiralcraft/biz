<script>
  import { getContext } from 'svelte';
  import TrackerStatusSelector from '@vfs/app/biz/trackers/TrackerStatusSelector.svelte';
  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte';
  import SoloActivityPanel from '@vfs/app/layout/SoloActivityPanel.svelte';
  import LabeledElement from '@vfs/app/layout/LabeledElement.svelte';
  
  const app=getContext("App");
  const biz=getContext("biz");

  export let options;
  export let contextInfo=[];
  export let updated= ()=>{};
  
  let component;
  let tracker;
  let editingTrackerModelComponent;
  let editingTrackerModel;
  let updateData = { newStatus: null, note: "", alert: "" };
  let updateValid=false;

  const alerts=
  [ { code:'i', 
      icon: app.icons["infoCircle"],
      color: "text-info",
    },
    { code: 's',
      icon: app.icons["checkCircle"],
      color: "text-success",
    },
    { code: 'w', 
      icon: app.icons["exclamationTriangle"],
      color: "text-warning",
    },
    { code: 'd', 
      icon: app.icons["exclamationTriangle"],
      color: "text-danger",
    },
  ];
        
  $: load(options);
  
  $: updateValid = isChanged(updateData);
  
  function initUpdateData()
  {
    if (component)
    { updateData.newStatus = component.linkedTracker?component.linkedTracker.status:{};
    }
    else if (tracker)
    { updateData.newStatus = tracker.status;
    }
    
    updateData.note = "";
    updateData.alert = "";
    updateData=updateData;
  }
  
  function sameStatus(a,b)
  { return (!a && !b) || (a && b && a.id==b.id);
  }
  
  
  function isChanged()
  { 
    console.log("Checking changed");
    return updateData && tracker &&
          ( !sameStatus(updateData.newStatus,tracker.status)
            || updateData.alert!=""
            || (updateData.note!="" && updateData.note.trim()!="")
          );
  }
  
  function load(options)
  { 
    console.log("Load");
    if (options.contextInfo)
    { contextInfo=options.contextInfo;
    }
    component=options.trackerComponent;
    tracker=options.tracker;
    
    if (component && !tracker)
    {
      biz.trackerView.showForPkey
        (component.linkedTrackerId
        ,(data) =>
          { tracker=data;
          }
        );
    }
    
    initUpdateData();
    
    if (component)
    {
      biz.trackerModelComponentView.showForPkey
       (component.trackerModelComponentId
       ,(data) => 
         {
           editingTrackerModelComponent=data;
           if (data.linkedTrackerModelId)
           {
             biz.trackerModelView.showForPkey
               (data.linkedTrackerModelId
               ,(data) =>
                 { editingTrackerModel=data;
                 }
               )
           }
         }
       );
     }
     else if (tracker)
     { 
       biz.trackerModelView.showForPkey
         (tracker.modelId
         ,(data) =>
           { editingTrackerModel=data;
           }
         )
     }
  }

  function updateStatus(status)
  {
    updateData.newStatus = status;
    updateData=updateData;
  }
   
  function alertSelected(code)
  {
    console.log("old="+updateData.alert+" req="+code);
    if (updateData.alert==code)
    { updateData.alert="";
    }
    else
    { updateData.alert=code;
    }
    updateData=updateData;
  }
   
  function cancelAction()
  {
    initUpdateData();
  }
   
  function updateAction()
  {
    biz.trackerView.call
      (tracker.id,
      "update",
      { newStatusId: updateData.newStatus?updateData.newStatus.id:null,
        note: updateData.note,
        alert: updateData.alert,
      },
      (ret) => 
        { 
          tracker=ret;
          if (component)
          { 
            component.linkedTracker=tracker;
            console.log(JSON.stringify(tracker.alerts));
            component=component;
          }
          updated(tracker);
          initUpdateData();
        },
      );
  }
 
</script>

<div class="tracker-update-form mt-1">
  <form action="#/">
    <div class="d-flex flex-row my-1 w-100">
      <LabeledElement
        label="Current Status"
        labelClasses="text-sm fw-bold"
        classes="me-3"
        >
        <TrackerStatusWidget
          status={ tracker?tracker.status:{} }
        />
      </LabeledElement>
      <LabeledElement
        label="New Status"
        labelClasses="text-sm fw-bold"
        classes="me-3"
        >
        <TrackerStatusSelector
          status={ updateData.newStatus?updateData.newStatus:{} }
          trackerModel={editingTrackerModel}
          updateStatus={updateStatus}
        />
      </LabeledElement>
    </div>
    <div class="d-flex flex-row my-1 w-100">
      <LabeledElement
        label="Alert"
        labelClasses="text-sm fw-bold"
        >
        <div class="alert-selector">
          {#each alerts as alert}
            <label class="alert-check me-2" for="alert-{alert.code}">
              <input class="alert-{alert.code} alert-radio" 
                type="checkbox" name="alert" id="alert-{alert.code}" value="{alert.code}"
                on:change={ (e) => { alertSelected(alert.code) } }
                checked={ updateData.alert==alert.code }
              />
              <div class="icon-div d-inline-block">
                <svelte:component class="icon {alert.color}" this={alert.icon} size="1.75x"/>
              </div>
            </label>
          {/each}
        </div>
      </LabeledElement>
    </div>
    <LabeledElement
      classes="my-1 w-100"
      label="Status Update Note"
      labelClasses="text-sm fw-bold"
      >
      <textarea class="w-100 note-input" name="note" 
        bind:value={updateData.note}
        on:change={ ()=> { updateData=updateData } }
      />
    </LabeledElement>
    <div class="buttons d-flex flex-row w-100">
      <button type="button" class="btn btn-primary btn-sm"
        on:click|preventDefault={updateAction}
        disabled={!updateValid}
        >Update
      </button>
      <button type="button" class="btn btn-secondary btn-sm ms-auto"
        on:click|preventDefault={cancelAction}
        >Cancel
      </button>
    </div>      
  </form>
</div>

<style>

.note-input
{ 
  height: 10rem;
  font-family: Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,
                Bitstream Vera Sans Mono,Courier New, monospace;
}

.alert-selector
{
  margin-top: 1px;
}

input[type=checkbox]
{
  position: absolute;
  opacity: 0;
}

input[type=checkbox] + .icon-div
{
  cursor: pointer;
  border-radius: 4px;
  border: 3px solid #FFFFFF;
  padding: 4px;
}


input[type=checkbox]:hover + .icon-div,
input[type=checkbox]:focus + .icon-div
{
  background-color: #f4f9ff;
  border: 3px solid #aaaaaa;
}

input[type=checkbox]:checked + .icon-div
{
  border: 3px solid #7db1ff;
}

/* Workaround for transition interfering with focus */
.btn
{ 
  transition: none;
}

.form-control
{
  transition: none;
  resize: none;
}
</style>