<script>
  import { getContext, onMount, onDestroy } from "svelte";
  import { derived,writable } from "svelte/store";
  
  import SoloActivityPanel from "@vfs/app/layout/SoloActivityPanel.svelte";
  import LabeledElement from "@vfs/app/layout/LabeledElement.svelte";
  
  import BillingCategoryTable from "@vfs/app/biz/customers/BillingCategoryTable.svelte";
  import BillingContactPanel from "@vfs/app/biz/customers/BillingContactPanel.svelte";
  import { PlusCircleIcon } from "svelte-feather-icons";

  export let embedded=true;
  
  const app=getContext("App");
  const biz=getContext("biz");
  
  const customerView=biz.customerView;
  const customerAccountView=biz.customerAccountView;
  const dataController=getContext("DataController");
  const key=dataController.key;
  const dataStore=derived(key,async ($key,set) => 
    {
      customerView.showForPkey($key,(data) => { set(data) });
    });
  const contact = writable();;

  let customer;
  let tradeAccount;
  let title;
  
  let scatter = (data) =>
  {
    customer=data;
    if (customer)
    { 
      if (customer.tradeAccount && customer.tradeAccount.accountId)
      { 
        biz.customerAccountView.showForPkey
          (customer.tradeAccount.accountId
          ,(data) => 
            { 
              tradeAccount=data;
              if (tradeAccount)
              { $contact=tradeAccount.contact;
              }
              else
              { $contact=null;
              }
            }
          );
      }
      else
      { 
        tradeAccount=null;
        $contact=null
      }
      
      title = "Customer: "+customer.name;
    }
    else
    { 
      tradeAccount=null;
      $contact=null;
    }
    $contact=$contact;   
    console.log("Scatter contact: "+JSON.stringify($contact));
  }
  
  let unsub;
  onMount(() => 
    { unsub=dataStore.subscribe(scatter);
    }
  );
  
  onDestroy(() => { if (unsub) { unsub() } });

  const tradeAccountUpdated = (data) =>
  { 
    tradeAccount=data;
    customer.tradeAccount=data;
    $contact=tradeAccount.contact;
  }  

  const createCustomerAccount = (e) =>
  {
    customerAccountView.edited(
      { accountId: "-",
        customerId: customer.id,
        displayName: customer.name,
      },
      tradeAccountUpdated
    );
  }
  
  const createContact = (e) =>
  {
    biz.contactView.edited(
      { id:"-" },
      (data) =>
        { 
          $contact=data;
          tradeAccount.contact=data;
          tradeAccount.contactId=data.id;
          console.log("Posting tradeAccount "+JSON.stringify(tradeAccount));
          customerAccountView.edited(
            tradeAccount
            ,tradeAccountUpdated
          );
          
        
        }
    );
  }
  
</script>

{#if tradeAccount}
  
  <SoloActivityPanel title={title} border={embedded?"none":"top"}>
    {#if $contact}
      <BillingContactPanel contact={contact} title="Customer Contact"/>
    {:else}
      <div class="h6 d-flex flex-row">
        <div class="title d-inline-block">
          Customer Contact
        </div>
        <a href="#/" class="icon d-inline-block ms-auto" 
          on:click|preventDefault={ createContact }
          >
          <PlusCircleIcon size="1.25x"/>
        </a>
      </div>
      <div>No contact info</div>
    {/if}
    <BillingCategoryTable master={tradeAccount} details={tradeAccount.projects}/>
  </SoloActivityPanel>
{:else}
  <SoloActivityPanel title={title} border={embedded?"none":"top"}>
    <div class="alert alert-primary d-flex align-items-center" role="alert">
      No account profile. 
      <button type="button" class="button btn-primary ms-auto"
        on:click|preventDefault={ createCustomerAccount }
        >Create one
      </button>
    </div>
  </SoloActivityPanel>

{/if}