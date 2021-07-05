<script>
  import { onMount, getContext, setContext } from 'svelte';
  import { writable,derived } from 'svelte/store';
  import dataControllerContext from '@vfs/spiralcraft/data/dataControllerContext.js';
  import ContactForm from '@vfs/app/biz/contacts/ContactForm.svelte';
  
  const app=getContext("App");

  export let contact;
  export let title;
  
  const key = derived (contact, $contact => 
      (($contact && $contact.id && $contact.id!="-")?$contact.id:null)
    );

  const onSave = (data) => { $contact=data };
  const onTrash = () => { $contact=null; };
  
  setContext(
    "DataController",
    dataControllerContext({cursor: contact,key,onSave,onTrash})
  );
  
  console.log(JSON.stringify($contact));
</script>

<ContactForm create={$key!=null} embedded={true} title={title} titleClasses="h6"/>
