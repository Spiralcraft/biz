<script>
  import { getContext } from 'svelte';
  import { derived } from 'svelte/store';
  import Tabs from '@vfs/app/layout/Tabs.svelte';
  import SoloActivityPanel from '@vfs/app/layout/SoloActivityPanel.svelte';
  import TrackerModelForm from '@vfs/app/biz/trackerModels/TrackerModelForm.svelte';
  import TrackerStatusSetTable from '@vfs/app/biz/trackerModels/TrackerStatusSetTable.svelte';
  import TrackerModelComponentTable from '@vfs/app/biz/trackerModels/TrackerModelComponentTable.svelte';
  
  export let create;
//  export let embedded;
  
  const app=getContext("App");
  const biz=getContext("biz");

  const InfoIcon = app.icons["info"];
  const StoplightIcon = app.icons["stoplight"];
  const Diagram3Icon = app.icons["diagram3"];

  
  const trackerModelView=biz.trackerModelView;
  const dataController=getContext("DataController");
  const key=dataController.key;
  const dataStore=derived(key,async ($key,set) => 
    {
      trackerModelView.showForPkey($key,(data) => { set(data); });
    });

  let trackerModel;
  
  $: trackerModel=$dataStore;
  
  let active="info";    
  let tabs = 
  [ 
    { id:"info", iconComponent: InfoIcon, label:"Info" }
  ];
  
  if (!create)
  {
    tabs=
    [ ...tabs,
      { id:"statusSet", iconComponent: StoplightIcon, label:"Status Set" },
      { id:"components", iconComponent: Diagram3Icon, label:"Components" },
    ];
  };
</script>

<SoloActivityPanel border="none">
  <div slot="title" class="d-inline-block">
    <span class="fw-bold fs-6">Tracker Model:</span>
    <span class="fw-normal">{trackerModel?trackerModel.name:""}</span>
  </div>
  <div class="tabBar">
    <Tabs bind:active data={ tabs }/>
  </div>
  <div class="trackerModelDetailContent">
    {#if active=="info"}
      <TrackerModelForm
        create={create}
        embedded={true}
      />
    {:else if active=="statusSet"}
      <TrackerStatusSetTable 
        master={trackerModel} 
        details={trackerModel?trackerModel.statusSet:[]}
        fitContainer={true}
      />
    {:else if active=="components"}
      <TrackerModelComponentTable
        master={trackerModel} 
        details={trackerModel?trackerModel.components:[]}
        fitContainer={true}
        onOrderChanged={ (data) => { trackerModel=data } }
      />
    {/if}
  </div>
</SoloActivityPanel>