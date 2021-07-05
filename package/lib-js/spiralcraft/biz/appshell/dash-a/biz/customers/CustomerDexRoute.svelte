<script>
  import { getContext } from 'svelte';
  import AbstractDexRoute from "@vfs/app/components/AbstractDexRoute.svelte";
  import CustomerDetailPanel from "@vfs/app/biz/customers/CustomerDetailPanel.svelte";
  
  const biz=getContext("biz");
  const columns =
  [
    {title:"Name",field:"name"}
  ]
  const dataView=biz.customerView;
  
  const detailRoute="/customers";
  const activityTitle = "Customer List";
  const panelTitle = "Customers";

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
  <CustomerDetailPanel slot="detail-callout"
    create={false}
    embedded={true}
  />
</AbstractDexRoute>
