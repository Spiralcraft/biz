<script>
  import { getContext } from 'svelte';
  import InnerPanel from '@vfs/app/layout/InnerPanel.svelte';
  import DataBrowser from '@vfs/app/layout/DataBrowser.svelte';
  import Modal from '@spiralcraft/svelte/modal/Modal.svelte';
  
  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte';
  import TrackerDetailPanel from '@vfs/app/biz/trackers/TrackerDetailPanel.svelte';
  import AlertCountCluster from '@vfs/app/biz/trackers/AlertCountCluster.svelte';

  const app=getContext("App");
  const biz=getContext("biz");
  
  const EditIcon = app.icons.edit;
  
  export let contextInfo=[];
  export let details;
  export let onChange= () => {};
  
//  export let master;
  
  let editingId;
  let editingTrackerModel;
  let editingTrackerModelComponent;
  let trackerUpdateModal;
  let modalActive;
  
  const XSquareIcon=app.icons["xSquare"];
  
  const editAction = (trackerComponent,focus) =>
  {
    return (e) => 
    { 
      console.log("Editing "+JSON.stringify(trackerComponent));
      modalActive = focus?focus:"update";
      trackerUpdateModal.show
        ({ trackerComponent: trackerComponent,
           updateStatus: updateStatus(trackerComponent),
         
         }
        );
/*
      editingId = trackerComponent.id;
 */
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
  
  function updated()
  { 
    details=details;
    onChange();
  }
</script>

<InnerPanel title="Tracker Components" fitContainer={true}>
  {#if !details || details.length==0}
    <div class="alert alert-primary" role="alert">
      No components.
    </div>
  {:else}
    <table class="component-table table table-bordered h-100 overflow-auto">
      <colgroup>
        <col span="1" width="175"/>
        <col span="1" width="124"/>
        <col span="1" width="40"/>
      </colgroup>
      {#each details as detail}
          <tr >
            <td>
              <a href="{'#'}"
                on:click|preventDefault={editAction(detail,"log")}
                >
                {detail.name}
              </a>
            </td>
            <td>
              <a href="{'#'}"
                on:click|preventDefault={editAction(detail,"update")}
                class="status-link"
                >
                <TrackerStatusWidget 
                  status={ (detail.linkedTracker && detail.linkedTracker.status)
                            ?detail.linkedTracker.status
                            :{}
                         }
                  >
                  <EditIcon size="1x" slot="icon"/>
                </TrackerStatusWidget>
              </a>
            </td>
            <td>
              <a href="{'#'}"
                on:click|preventDefault={editAction(detail,"alerts")}
                >
                {#if detail.linkedTracker 
                  && detail.linkedTracker.activeAlerts
                  && detail.linkedTracker.activeAlerts.length>0
                  }
                  <AlertCountCluster 
                    alertSet=
                      {biz.alerts.sort
                        (detail.linkedTracker.activeAlerts)
                      }
                    {biz}
                    height="29px"
                  />
                {/if}
              </a>
            </td>
          </tr>
        
      {/each}
    </table>
  {/if}
</InnerPanel>

<Modal bind:this={trackerUpdateModal} let:options>
  <div slot="modal-header" let:close class="d-flex flex-row tracker-modal-header p-1">
    <div class="title-container fw-500 fs-6 d-inline-block">
      Tracker Detail
    </div>
    <a class="modal-close-button d-inline-block ms-auto" 
      href={"#"} title="Close" on:click|preventDefault={ close }
      >
      <XSquareIcon size="1.5x"/>
    </a>
  </div>
  <TrackerDetailPanel {contextInfo} {options} {updated} active={modalActive}/>
</Modal>

<style>

.component-table a 
{ 
  display: block;
  padding: 0;
  text-decoration: none;
}

.status-link svg
{
  position: relative;
  top: 0;
  left: 0;
}
</style>
