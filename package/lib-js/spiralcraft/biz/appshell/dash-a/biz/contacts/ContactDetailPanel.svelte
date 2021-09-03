<script>
  import { getContext } from "svelte";
  import ContactForm from '@vfs/app/biz/contacts/ContactForm.svelte';
  import ContactNotesTab from '@vfs/app/biz/contacts/ContactNotesTab.svelte';
  import ContactTaggedTab from '@vfs/app/biz/contacts/ContactTaggedTab.svelte';
  import Tabs from '@vfs/app/layout/Tabs.svelte';
  
  export let create;
//  export let embedded;

  const app=getContext("App");
  const InfoIcon = app.icons["info"];
  const CardTextIcon = app.icons["cardText"];
  const TagIcon = app.icons["tag"];
  
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
      { id:"tags", iconComponent: TagIcon, label:"Tags", },
    ]
  }

  let notes;
  let tags;
    
</script>

<div class="h-100 overflow-auto d-flex flex-column">
  <Tabs bind:active data={ tabs } linkClasses="px-2"/>
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
  {:else if active=="tags"}
    <ContactTaggedTab
      master={$cursor} 
      details={tags}
      fitContainer={true}
    />
  {/if}
</div>
