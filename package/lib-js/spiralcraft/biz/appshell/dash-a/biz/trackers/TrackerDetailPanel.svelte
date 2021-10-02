<script>
  import { getContext } from 'svelte';
  import Tabs from '@vfs/app/layout/Tabs.svelte';
  import TrackerUpdateForm from '@vfs/app/biz/trackers/TrackerUpdateForm.svelte';
  import TrackerAlertTab from '@vfs/app/biz/trackers/TrackerAlertTab.svelte';
  import TrackerLogTab from '@vfs/app/biz/trackers/TrackerLogTab.svelte';
  import SoloActivityPanel from '@vfs/app/layout/SoloActivityPanel.svelte';
  import LabeledElement from '@vfs/app/layout/LabeledElement.svelte';

  export let options;
  export let contextInfo=[];
  export let updated= ()=>{};

  const app=getContext("App");
  const biz=getContext("biz");
  const PlayCircleIcon = app.icons["playCircle"];
  const InfoIcon = app.icons["info"];
  const EditIcon = app.icons["edit"];
  const JournalTextIcon = app.icons["journalText"];
  const ExclamationTriangleIcon = app.icons["exclamationTriangle"];
  
  let title = "Tracker Detail";
  let component;
  let tracker;
  let modelComponent;
  let linkedTrackerModel

  export let active = "update";
  
  let tabs = 
  [ 
    { id:"update", iconComponent: EditIcon, label:"Update" },
    { id:"alerts", iconComponent: ExclamationTriangleIcon, label:"Alerts", },
    { id:"log", iconComponent: JournalTextIcon, label:"Log", },
  ];


  $: load(options);
  
  function load(options)
  { 
    console.log("Load TrackerDetail");
    if (options.contextInfo)
    { contextInfo=options.contextInfo;
    }
    component=options.trackerComponent;
    tracker=options.tracker;
    if (!component)
    { title="Master Tracker Detail";
    }
    
    if (component && !tracker && component.linkedTrackerId)
    {
      biz.trackerView.showForPkey
        (component.linkedTrackerId
        ,(data) =>
          { 
            console.log("Loaded linked tracker for component");
            tracker=data;
          }
        );
    }
    else if (component)
    {
      biz.trackerModelComponentView.showForPkey
       (component.trackerModelComponentId
       ,(data) => 
         {
           modelComponent=data;
           if (data.linkedTrackerModelId)
           {
             biz.trackerModelView.showForPkey
               (data.linkedTrackerModelId
               ,(data) =>
                 { linkedTrackerModel=data;
                 }
               )
           }
         }
       ); 
    }
    else if (tracker)
    {
      // Refresh the tracker directly
      biz.trackerView.showForPkey
        (tracker.id
        ,(data) =>
          { 
            console.log("Loaded linked tracker for component");
            tracker=data;
          }
        );
    }
  }
  
  function trackerUpdated(tracker$)
  {
    console.log("Tracker updated "+JSON.stringify(tracker$));
    tracker=tracker$;
    updated(tracker);
  }
  
  function startTracker()
  {
    biz.trackerComponentView.call
      (component.id
      ,"initTracker"
      ,{}
      ,(data) => 
        { 
          
          options.trackerComponent.linkedTrackerId = data.linkedTrackerId;
          options.trackerComponent.linkedTracker = data.linkedTracker;
          options.tracker=data.linkedTracker;
          load(options);
          trackerUpdated(tracker);
        }
      )
  }
</script>

<SoloActivityPanel hasTitle={false} hasHeader={false} border="none" 
  classes="mx-2 mb-2 mt-0" bodyClasses="p-1 d-flex flex-column"
  >
  <div class="tracker-detail-panel d-flex flex-column h-100 overflow-auto">
    <div class="info-header mb-3 d-flex flex-row">
      {#each contextInfo as info}
        <LabeledElement 
          classes="me-1 ps-1 border-start"
          label={info.label}
          labelClasses="text-sm fw-bold"
          data={info.text}
          >
        </LabeledElement>
      {/each}
      {#if component}
        <LabeledElement 
          classes="me-1 ps-1 border-start"
          label="Component"
          labelClasses="text-sm fw-bold"
          data='{component?component.name:""}'
          >
        </LabeledElement>
      {/if}
    </div>

    {#if tracker}
      <Tabs bind:active data={ tabs } linkClasses="px-2 transition-none"/>
      {#if active=="update"}
        <TrackerUpdateForm {contextInfo} {options} updated={trackerUpdated}/>
      {:else if active=="alerts"}
        <TrackerAlertTab {tracker} updated={trackerUpdated}/>
      {:else if active=="log"}
        <TrackerLogTab {tracker}/>
      {/if}
    {:else if linkedTrackerModel}
      <div class="fw-500 pb-1">Start tracker:</div>
      <div class="d-flex flex-row align-items-center mx-1">
        <button type="button" class="pb-2 btn btn-sm btn-success col3 col2-sm flex-shrink-0 flex-grow-0"
          on:click|preventDefault={startTracker}
          >
          <PlayCircleIcon size="1.25x"/>
        </button>
        <span class="col9 col10-sm ms-3">
          {linkedTrackerModel.name}: {linkedTrackerModel.description}
        </span>
      </div>
    {/if}
  </div>
</SoloActivityPanel>

<style>

.tracker-detail-panel
{
  min-height: 25em;
  min-width: 25em;
  max-width: 360px;
}


</style>