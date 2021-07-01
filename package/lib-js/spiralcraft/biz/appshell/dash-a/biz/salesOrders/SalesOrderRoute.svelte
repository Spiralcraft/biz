<script>
  import { onMount, getContext } from 'svelte';
  
  import SalesOrderForm from "@vfs/app/biz/salesOrders/SalesOrderForm.svelte";
  import AbstractCRUDRoute from "@vfs/app/components/AbstractCRUDRoute.svelte";

  const title="Sales Orders";
  const doneRoute="/salesOrders";

  export let id;
  
  
</script>

<AbstractCRUDRoute
  title={title}
  doneRoute={doneRoute}
  id={id}
  >
  <SalesOrderForm/>
</AbstractCRUDRoute>


