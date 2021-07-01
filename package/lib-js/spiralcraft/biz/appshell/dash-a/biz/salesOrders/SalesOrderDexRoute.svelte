<script>
  import { getContext } from 'svelte';
  import AbstractDexRoute from "@vfs/app/components/AbstractDexRoute.svelte";
  import SalesOrderForm from "@vfs/app/biz/salesOrders/SalesOrderForm.svelte";
  
  const biz=getContext("biz");
  const columns =
  [
    {title:"Customer",field:"customer.displayName"},
    {title:"Net",field:"netAmount"},
    {title:"Period Close",field:"closeDate"},
    {title:"Invoice",field:"invoiceNumber"},
  ]
  const dataView=biz.salesOrderView;
  
  const detailRoute="/salesOrders";
  const activityTitle = "Sales Order List";
  const panelTitle = "Sales Orders";

  const props = 
  { 
    columns,
    dataView,
    detailRoute,
    activityTitle,
    panelTitle,
  }
</script>


<AbstractDexRoute { ...props }>
  <SalesOrderForm slot="detail-callout"
    create={false}
    embedded={true}
  />
</AbstractDexRoute>
