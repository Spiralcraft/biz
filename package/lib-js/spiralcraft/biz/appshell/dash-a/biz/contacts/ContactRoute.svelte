<script>
  import { onMount, getContext } from 'svelte';
  
  import ContactForm from "@vfs/app/biz/contacts/ContactForm.svelte";
  import AbstractCRUDRoute from "@vfs/app/components/AbstractCRUDRoute.svelte";

  const title="Contact List";
  const doneRoute="/contacts";

  export let id;
  
  
</script>

<AbstractCRUDRoute
  title={title}
  doneRoute={doneRoute}
  id={id}
  >
  <ContactForm/>
</AbstractCRUDRoute>


