<script>
  import { getContext } from 'svelte';
  import InnerPanel from '@vfs/app/layout/InnerPanel.svelte';
  import DataBrowser from '@vfs/app/layout/DataBrowser.svelte';
  import { PlusCircleIcon, SaveIcon, TrashIcon, CheckIcon } 
    from 'svelte-feather-icons';
  import InPlaceTextInput from '@vfs/app/form/InPlaceTextInput.svelte';
  import InPlaceCheckInput from '@vfs/app/form/InPlaceCheckInput.svelte';
  
  const app=getContext("App");
  const biz=getContext("biz");
  
  export let details;
  export let master;
  
  let editingId;
  let editingDetail;
  
  const editAction = (detail) =>
  {
    if (!detail)
    { 
      detail = 
        { id: "-", 
          displayName: "",
          active: false, 
          customerId: master.accountId,
        };
    }
    if (!details)
    { details=[];
    }
    
    return (e) => 
    { 
      console.log("Editing "+JSON.stringify(detail));
      editingId = detail.id;
     
      editingDetail= { ...detail };
    }
  }
  
  const cancel = (e) => 
  {
    editingId=null;
    editingDetail=null;
  }

  const trash = (e) => { };
  
  const clearEditing = () =>
  { 
    editingId=null;
    editingDetail=null;
  }
  
  const save = (e) =>
  { 
    biz.customerProjectView.edited
      (editingDetail,(data) =>
        {
          for (var i=0;i<details.length;i++)
          {
            if (details[i].id==data.id)
            { 
              details[i]=data;
              details=details;
              clearEditing();
              return;
            }
          }
          details.push(data);
          details=details;
          clearEditing();
          return;
        }
      );
  }
  
  
  const EditIcon=app.icons["edit"];
</script>

<InnerPanel title="Billing Categories">
  <span slot="header-controls">
    <a href="#/" class="icon" 
      on:click|preventDefault={ editAction()}
      >
      <PlusCircleIcon size="1.25x"/>
    </a>
  </span>
  {#if (!details || details.length==0) && !(editingId=='-')}
    <div class="alert alert-primary" role="alert">
      No billing categories
    </div>
  {:else}
    <form>
    <table class="table table-bordered">
      <colgroup>
        <col span="1" width="24"/>
        <col span="1" width="300"/>
        <col span="1" width="24"/>
        <col span="1" width="48"/>
      </colgroup>
      <tr>
        <th></th>
        <th>Category</th>
        <th>Active</th>
        <th></th>
      </tr>
      {#if editingId=='-'}
        <tr>
          <td>
            <a href="#/" class="icon p-0 d-inline-block cancel"
              on:click|preventDefault={cancel}
              >
              <EditIcon size="1x"/>
            </a>
          </td>
          <td>
            <InPlaceTextInput bind:value={editingDetail.displayName}/>
          </td>
          <td>
            <InPlaceCheckInput bind:value={editingDetail.active}/>
          </td>
          <td>
            <div class="icons py-0 d-flex flex-row flex-nowrap">
              <a href="#/" class="icon py-0 d-inline-block"
                on:click|preventDefault={save}
                >
                <SaveIcon size="1x"/>
              </a>
              <a href="#/" class="icon py-0 d-inline-block"
                on:click|preventDefault={trash}
                >
                <TrashIcon size="1x"/>
              </a>
            </div>
          </td>
        </tr>
      {/if}
      {#each details as detail}
        {#if !editingId || editingId!=detail.id}
          <tr>
            <td>
              <div class="p-0" style="width: 13">
                &nbsp;
              </div>
            </td>
            <td>
              {detail.displayName}
            </td>
            <td>
              <div class="p-0" style="width: 13">
                {#if detail.active}
                  <CheckIcon size="1x"/>
                {:else}
                  &nbsp;
                {/if}
              </div>
            </td>
            <td>
              <a href="#/" class="icon py-0 d-inline-block"
                on:click|preventDefault={editAction(detail)}
                >
                <EditIcon size="1x"/>
              </a>
            </td>
          </tr>
        {:else}
          <tr>
            <td>
              <a href="#/" class="icon p-0 d-inline-block cancel"
                on:click|preventDefault={cancel}
                >
                <EditIcon size="1x"/>
              </a>
            </td>
            <td>
              <InPlaceTextInput bind:value={editingDetail.displayName}/>
            </td>
            <td>
              <InPlaceCheckInput bind:value={editingDetail.active}/>
            </td>
            <td>
              <div class="icons py-0 d-flex flex-row flex-nowrap">
                <a href="#/" class="icon py-0 d-inline-block"
                  on:click|preventDefault={save}
                  >
                  <SaveIcon size="1x"/>
                </a>
                <a href="#/" class="icon py-0 d-inline-block"
                  on:click|preventDefault={trash}
                  >
                  <TrashIcon size="1x"/>
                </a>
              </div>
            </td>
          </tr>
        {/if}
      {/each}
    </table>
    </form>
  {/if}
</InnerPanel>

<style>
.cancel
{ color: green;
}
</style>