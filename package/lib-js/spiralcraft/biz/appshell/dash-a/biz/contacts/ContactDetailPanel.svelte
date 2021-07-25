<script>
  import { getContext } from "svelte";
  import ContactForm from '@vfs/app/biz/contacts/ContactForm.svelte';
  import Tabs from '@vfs/app/layout/Tabs.svelte';
  
  export let create;
  export let embedded;

  const app=getContext("App");
  const InfoIcon = app.icons["info"];
  
  let active="info";    

  const dataController = getContext("DataController");
  
  const key=dataController.key;
  const cursor = dataController.cursor;
  const tabs = 
  [ 
    { id:"info", iconComponent: InfoIcon, label:"Info" },
  ];
</script>

<div>
  <Tabs bind:active data={ tabs }/>
  {#if active=="info"}
    <ContactForm
      create={create}
      embedded={embedded}
    />
  {/if}
</div>
