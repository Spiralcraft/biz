<script>
  import { getContext } from "svelte";
  import ProjectForm from '@vfs/app/biz/projects/ProjectForm.svelte';
  import ProjectTrackerPanel from '@vfs/app/biz/projects/ProjectTrackerPanel.svelte';

  export let create;
  export let embedded;

  const app=getContext("App");
  const InfoIcon = app.icons["info"];
  const WorkflowIcon = app.icons["workflow"];
  
  let active="info";    

  const dataController = getContext("DataController");
  
  const key=dataController.key;
  const cursor = dataController.cursor;
</script>

<div>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link" class:active={active=="info"} href="/#"
        on:click|preventDefault={()=>{ active="info" }}
        >
        <InfoIcon size="1x"/><span class="nav-label ms-2">Info</span>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" class:active={active=="tracker"} href="/#"
        on:click|preventDefault={()=>{ active="tracker" }}
        >
        <WorkflowIcon size="1x"/><span class="nav-label ms-2">Tracker</span>
      </a>
    </li>
  </ul>
  {#if active=="info"}
    <ProjectForm
      create={create}
      embedded={embedded}
    />
  {:else if active=="tracker"}
    <ProjectTrackerPanel embedded={embedded}/>
    
  {/if}
</div>
