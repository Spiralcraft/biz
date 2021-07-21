<script>
  import { getContext } from 'svelte';
  import InnerPanel from '@vfs/app/layout/InnerPanel.svelte';
  import DataBrowser from '@vfs/app/layout/DataBrowser.svelte';
  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte';
  import TrackerStatusSelector from '@vfs/app/biz/trackers/TrackerStatusSelector.svelte';

  const app=getContext("App");
  const biz=getContext("biz");
  
  export let details;
  export let onChange= () => {};
  
//  export let master;
  
  let editingId;
  let editingTrackerModel;
  let editingTrackerModelComponent;
  
  const editAction = (trackerComponent) =>
  {
    return (e) => 
    { 
      console.log("Editing "+JSON.stringify(trackerComponent));
      editingId = trackerComponent.id;
      biz.trackerModelComponentView.showForPkey
        (trackerComponent.trackerModelComponentId
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
  }
  
  const updateStatus = (trackerComponent) =>
  {
    const tracker=trackerComponent.linkedTracker;
    
    return (status) =>
    { 
      if (!tracker)
      { 
        biz.trackerComponentView.call
          ( trackerComponent.id,
            "initTracker",
            {},
            (data) =>
              { 
                trackerComponent.linkedTracker=data.linkedTracker;
                trackerComponent.linkedTrackerId=data.linkedTrackerId;
                updateTrackerStatus(data.linkedTracker,status);
              },
          );
      }
      else
      { updateTrackerStatus(tracker,status);
      }
    }
  };
  
  const updateTrackerStatus = (tracker,status) =>
  {
      
    console.log("Updating status of "+JSON.stringify(tracker)
                +" to "+JSON.stringify(status)
              );    
    tracker.status=status;
    tracker.statusId=status.id;
    biz.trackerView.edited
      (tracker
      ,(data) => 
            {
              console.log("Updated status of "+JSON.stringify(data)
                +" to "+JSON.stringify(data.status)
              );
              onChange();
            }
      );
      
  }
  
</script>

<InnerPanel title="Tracker Components" fitContainer={true}>
  {#if !details || details.length==0}
    <div class="alert alert-primary" role="alert">
      No components.
    </div>
  {:else}
    <table class="table table-bordered h-100 overflow-auto">
      <colgroup>
        <col span="1" width="175"/>
        <col span="1" width="124"/>
      </colgroup>
      {#each details as detail}
          <tr on:click|preventDefault={editAction(detail)}>
            <td>
              {detail.name}
            </td>
            <td>
              {#if detail.id==editingId }
                <TrackerStatusSelector 
                  status={ (detail.linkedTracker && detail.linkedTracker.status)
                            ?detail.linkedTracker.status
                            :{}
                          }
                  trackerModel={editingTrackerModel}
                  updateStatus={updateStatus(detail)}
                />
              {:else}
                <TrackerStatusWidget 
                  status={ (detail.linkedTracker && detail.linkedTracker.status)
                            ?detail.linkedTracker.status
                            :{}
                         }
                />
              {/if}
            </td>
          </tr>
        
      {/each}
    </table>
  {/if}
</InnerPanel>

