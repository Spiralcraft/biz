<script>
  import { getContext } from "svelte";
  import ProjectForm from '@vfs/app/biz/projects/ProjectForm.svelte';
  import ProjectTrackerPanel from '@vfs/app/biz/projects/ProjectTrackerPanel.svelte';
  import ProjectAlertsPanel from '@vfs/app/biz/projects/ProjectAlertsPanel.svelte';
  import ProjectLogPanel from '@vfs/app/biz/projects/ProjectLogPanel.svelte';
  import Tabs from '@vfs/app/layout/Tabs.svelte';
  import LabeledElement from '@vfs/app/layout/LabeledElement.svelte';
  export let create;
  export let embedded;

  const app=getContext("App");
  const InfoIcon = app.icons["info"];
  const WorkflowIcon = app.icons["workflow"];
  const ExclamationTriangleIcon = app.icons["exclamationTriangle"];
  const EditIcon = app.icons["edit"];
  const JournalTextIcon = app.icons["journalText"];
  
  let active="info";    

  const dataController = getContext("DataController");
  
  const key= dataController.key;
  const cursor = dataController.cursor;
  
  let tabs = 
  [ 
    { id:"info", iconComponent: InfoIcon, label:"Info" },
  ];
  
  if (!create)
  { tabs = 
    [ ...tabs,
      { id:"tracker", iconComponent: WorkflowIcon, label:"Tracker", },
      { id:"alerts", iconComponent: ExclamationTriangleIcon, label:"Alerts", },
      { id:"log", iconComponent: JournalTextIcon, label:"Log", },
    ]
  }  
  
</script>

<div class="h-100 overflow-auto d-flex flex-column">
  <div class="header d-flex flex-row">
    <LabeledElement
      classes="mb-1"
      label="Project"
      labelClasses="text-sm fw-bold"
      elementClasses="fs-6"
      >{$cursor?$cursor.name:""}
    </LabeledElement>
  </div>
  <Tabs bind:active data={ tabs } linkClasses="px-2"/>
  {#if active=="info"}
    <ProjectForm
      create={create}
      embedded={embedded}
    />
  {:else if active=="tracker"}
    <ProjectTrackerPanel embedded={embedded}/>
  {:else if active=="alerts"}
    <ProjectAlertsPanel project={$cursor} />
  {:else if active=="log"}
    <ProjectLogPanel project={$cursor} />
    
  {/if}
</div>
