<script>
  import { onMount, getContext } from 'svelte';
  
  import CustomerForm from "@vfs/app/biz/customers/CustomerForm.svelte";
  import AbstractCRUDRoute from "@vfs/app/components/AbstractCRUDRoute.svelte";

  const title="Customer List";
  const doneRoute="/customers";

  export let id;
  
  
</script>

<AbstractCRUDRoute
  title={title}
  doneRoute={doneRoute}
  id={id}
  >
  <CustomerForm/>
</AbstractCRUDRoute>


