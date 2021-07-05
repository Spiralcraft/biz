<script>
  import { getContext } from 'svelte';
  import InnerPanel from '@vfs/app/layout/InnerPanel.svelte';
  import DataBrowser from '@vfs/app/layout/DataBrowser.svelte';
  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte';
  import TrackerStatusSelector from '@vfs/app/biz/trackers/TrackerStatusSelector.svelte';

  const app=getContext("App");
  const biz=getContext("biz");
  
  export let details;
//  export let master;
  
  let editingId;
  let editingTrackerModel;
  let editingTrackerModelComponent;
  
  const editAction = (tracker) =>
  {
    return (e) => 
    { 
      console.log("Editing "+JSON.stringify(tracker));
      editingId = tracker.id;
      biz.trackerModelComponentView.showForPkey
        (tracker.trackerModelComponentId
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
  
  const updateStatus = (tracker) =>
  {
    return (status) =>
    { 
      console.log("Updating status of "+JSON.stringify(tracker)+" to "+JSON.stringify(status));
      tracker.status=status;
    }
  }
  
</script>

<InnerPanel title="Tracker Components">
  {#if !details || details.length==0}
    <div class="alert alert-primary" role="alert">
      No components.
    </div>
  {:else}
    <table class="table table-bordered">
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
                  status={detail.status?detail.status:{}}
                  trackerModel={editingTrackerModel}
                  updateStatus={updateStatus(detail)}
                />
              {:else}
                <TrackerStatusWidget status={detail.status?detail.status:{}}/>
              {/if}
            </td>
          </tr>
        
      {/each}
    </table>
  {/if}
</InnerPanel>

