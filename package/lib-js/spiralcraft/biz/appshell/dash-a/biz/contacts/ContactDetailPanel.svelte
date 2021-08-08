<script>
  import { getContext } from "svelte";
  import ContactForm from '@vfs/app/biz/contacts/ContactForm.svelte';
  import ContactCommentsTab from '@vfs/app/biz/contacts/ContactCommentsTab.svelte';
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
      { id:"comments", iconComponent: CardTextIcon, label:"Comments", },
    ]
  }

  let comments;
    
</script>

<div class="h-100 overflow-auto d-flex flex-column">
  <Tabs bind:active data={ tabs }/>
  {#if active=="info"}
    <ContactForm
      create={create}
      embedded={true}
      bodyClasses="h-100 d-flex flex-column"
    />
  {:else if active=="comments"}
    <ContactCommentsTab
      master={$cursor} 
      details={comments}
      fitContainer={true}
    />
  {/if}
</div>
