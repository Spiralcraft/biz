<script>
  import { getContext } from "svelte";
  import ContactForm from '@vfs/app/biz/contacts/ContactForm.svelte';
  import ContactNotesTab from '@vfs/app/biz/contacts/ContactNotesTab.svelte';
  import Tabs from '@vfs/app/layout/Tabs.svelte';
  
  export let create;
  export let embedded;

  const app=getContext("App");
  const InfoIcon = app.icons["info"];
  const CardTextIcon = app.icons["cardText"];
  
  let active="info";    

  const dataController = getContext("DataController");
  
  const key=dataController.key;
  const cursor = dataController.cursor;
  let tabs = 
  [ 
    { id:"info", iconComponent: InfoIcon, label:"Info" },
  ];
  
  if (!create)
  { tabs = 
    [ ...tabs,
      { id:"notes", iconComponent: CardTextIcon, label:"Notes", },
    ]
  }

  let notes;
    
</script>

<div class="h-100 overflow-auto d-flex flex-column">
  <Tabs bind:active data={ tabs }/>
  {#if active=="info"}
    <ContactForm
      create={create}
      embedded={true}
      bodyClasses="h-100 d-flex flex-column"
    />
  {:else if active=="notes"}
    <ContactNotesTab
      master={$cursor} 
      details={notes}
      fitContainer={true}
    />
  {/if}
</div>
