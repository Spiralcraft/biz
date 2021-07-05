<script>
  import { getContext } from "svelte";
  import CustomerForm from '@vfs/app/biz/customers/CustomerForm.svelte';
  import CustomerBillingPanel from '@vfs/app/biz/customers/CustomerBillingPanel.svelte';
  import Tabs from '@vfs/app/layout/Tabs.svelte';
  
  export let create;
  export let embedded;

  const app=getContext("App");
  const InfoIcon = app.icons["info"];
  const ReceiptIcon = app.icons["receipt"];
  
  let active="info";    

  const dataController = getContext("DataController");
  
  const key=dataController.key;
  const cursor = dataController.cursor;
  const tabs = 
  [ 
    { id:"info", iconComponent: InfoIcon, label:"Info" },
    { id:"billing", iconComponent: ReceiptIcon, label:"Billing" },
  ];
</script>

<div>
  <Tabs bind:active data={ tabs }/>
  {#if active=="info"}
    <CustomerForm
      create={create}
      embedded={embedded}
    />
  {:else if active=="billing"}
    <CustomerBillingPanel/>
  {/if}
</div>
