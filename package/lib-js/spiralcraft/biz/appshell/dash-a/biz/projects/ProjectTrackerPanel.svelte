<script>
  import { getContext, onMount, onDestroy } from "svelte";
  import { derived } from "svelte/store";
  
  import SoloActivityPanel from "@vfs/app/layout/SoloActivityPanel.svelte";
  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte';  
  import TrackerComponentTable from '@vfs/app/biz/trackers/TrackerComponentTable.svelte';
  export let embedded=true;
  
  const app=getContext("App");
  const biz=getContext("biz");

  const PlayCircleIcon = app.icons["playCircle"];
  const TrashIcon = app.icons["trash"];
  
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
  
  let canReset=false;
  let title="";
  let project=null;
  let tracking=false;
  let status=noStatus;

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
      ,{ runType: defaultRunType
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
      
  const updateStatus = (status) => 
  { 
    project.currentRun.tracker.status=status;
    project.currentRun.tracker.statusId=status.id?status.id:null;
    console.log("UpdateStatus "+project.currentRun.tracker.id+":"+status.id);
    
    trackerView.edited
      (project.currentRun.tracker
      ,(data) => 
        {
          project.currentRun.tracker=data;
          dataController.onSave(project);
          scatter(project);
        }
      );
    
  }
  
  let trackerComponentChanged = () =>
  { 
    dataController.onSave(project);
    scatter(project);
  }

  let trackerModel;
  const refreshTrackerModel = (id) => {
      console.log("Refreshing tracker "+id);
      trackerModelView.showForPkey(id, (data) => { trackerModel=data } );
    }

  let unsub;
  onMount(() => 
    { unsub=dataStore.subscribe(scatter);
    }
  );
  
  onDestroy(() => { if (unsub) { unsub() } });
  
</script>
<SoloActivityPanel title={title} border={embedded?"none":"top"}>
  <div class="d-flex flex-row align-items-center" slot="header-controls">
    {#if canReset}  
      <button 
        type="button" 
        class="btn btn-sm btn-warning col3 col2-sm flex-shrink-0 flex-grow-0"
        label="Reset run and discard progress"
        on:click|preventDefault={ (e)=> { resetRun() } }><TrashIcon size="1.25x"/>
      </button>
    {/if}
  </div>
  <div>
    {#if project}
      {#if !project.currentRun}
        <h6>Start a new run:</h6>
        <div class="d-flex flex-row align-items-center">
          <button type="button" class="btn btn-sm btn-success col3 col2-sm flex-shrink-0 flex-grow-0"
            on:click|preventDefault={startRun}><PlayCircleIcon size="1.25x"/>
          </button>
          <span class="col9 col10-sm ms-3">{defaultRunType}</span>
        </div>
      {/if}
      {#if tracking}
        <h6>Run: {project.currentRun.name} : {trackerModel?trackerModel.name:""}</h6>
        {#if trackerModel && trackerModel.description}
        <p>{trackerModel.description}</p> 
        {/if}
        <h6>Status</h6>       
        <div class="d-flex flex-row align-items-center mb-3 dropdown">
          <button data-bs-toggle="dropdown" aria-expanded="false" type="button"
            class="status-button btn btn-secondary dropdown-toggle 
              dropdown-toggle-split p-0 pe-1"
            on:click={(e)=> { refreshTrackerModel(project.currentRun.tracker.modelId) }}
            >
            <div class="d-inline-block">
              <TrackerStatusWidget
                status={status} 
                classes="me-1 rounded-1"
              />
            </div>
          </button>
          <ul class="dropdown-menu status-menu" aria-labelledby="status-dropdown">
          {#if trackerModel}
            {#each [ {}, ...trackerModel.statusSet ] as status}
              <li>
                <a class="dropdown-item status-select-item" href="/#" 
                  title='{status.description?status.description:"No Status"}'
                  on:click|preventDefault=
                    {(e) => {updateStatus(status)}
                    }
                  >
                  <TrackerStatusWidget status={status}/>
                </a>
              </li>
            {/each}
          {/if}
          </ul>
          <span class="col9 col10-sm ms-3">{status.description}</span>
        </div>
        <TrackerComponentTable 
          details={project.currentRun.tracker.components}
          onChange={trackerComponentChanged}
        />
      {/if}
    {/if}
  </div>
</SoloActivityPanel>

<style>
.status-button, .status-select-item
{
  font-size: var(--text-md);
}
.status-menu
{ min-width: 8rem;
}
</style>