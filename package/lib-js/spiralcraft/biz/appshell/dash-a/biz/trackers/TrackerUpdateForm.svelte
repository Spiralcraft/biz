<script>
  import { getContext } from 'svelte';
  import TrackerStatusSelector from '@vfs/app/biz/trackers/TrackerStatusSelector.svelte';
  import SoloActivityPanel from '@vfs/app/layout/SoloActivityPanel.svelte';
  import LabeledElement from '@vfs/app/layout/LabeledElement.svelte';
  
  const app=getContext("App");
  const biz=getContext("biz");

  export let options;
  
  let component;
  let tracker;
  let editingTrackerModelComponent;
  let editingTrackerModel;
  let title = "Tracker Update";
      
  $: load(options);
  
  function load(options)
  { 
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

 function updateTitle()
 {  
   title="Update Tracker Component: "+component.name;

 }
 
</script>

<SoloActivityPanel title="{title}" border="none" classes="m-2" bodyClasses="p-1">
  <div class="tracker-update-panel">
    <div class="info-header mb-3 d-flex flex-row">
      <LabeledElement 
        label="Component" 
        data='{component?component.name:""}'

      />
    </div>
    <TrackerStatusSelector 
      status={ (component.linkedTracker && component.linkedTracker.status)
                ?component.linkedTracker.status
                :{}
              }
      trackerModel={editingTrackerModel}
      updateStatus={options.updateStatus}
    />
  </div>
</SoloActivityPanel>

<style>
.tracker-update-panel
{
  min-height: 25em;
  min-width: 25em;
}

.tracker-update-panel :global(.labeled-element-label)
{
  font-size: var(--text-sm);
}

.tracker-update-panel :global(.labeled-element)
{
  font-weight: 500;
}

</style>