<script>
  import { getContext } from 'svelte';
  import InnerPanel from '@vfs/app/layout/InnerPanel.svelte';
  import DataBrowser from '@vfs/app/layout/DataBrowser.svelte';
  import { EditIcon,PlusCircleIcon } from 'svelte-feather-icons';

  const app=getContext("App");
  
  export let details;
  export let master;
  export let fitContainer;
  
  const add = () => 
    { app.nav("/trackerModels/"+master.id+"/component/-");
    };
  
  const editAction = (id) => (edit(id));
  
  const edit = (id) =>
    { app.nav("/trackerModels/"+master.id+"/component/"+id);    
    };
  
</script>

<InnerPanel title="Tracker Components" fitContainer={fitContainer}>
  <span slot="header-controls">
    <a on:click|preventDefault={add} href="/#">
      <PlusCircleIcon size="1.5x"/>
    </a>
  </span>

  {#if !details || details.length==0}
    <div class="alert alert-primary" role="alert">
      The set of components is empty. Press the '+' button to add one.
    </div>
  {:else}
    <table class="table table-bordered">
      <colgroup>
        <col span="1" width="175"/>
        <col span="1" width="125"/>
        <col span="1"/>
        <col span="1" width="36"/>
      </colgroup>
      {#each details as detail}
        <tr>
          <td>
            {detail.name}
          </td>
          <td>
            {detail.linkedTrackerModel?detail.linkedTrackerModel.name:"(select tracker model)"}
          </td>
          <td>
            <div>
                {detail.linkedTrackerModel?detail.linkedTrackerModel.description:""}
            </div>
          </td>
          <td>
            <a href="/#" on:click|preventDefault={editAction(detail.id)}>
              <EditIcon size="1.3x"/>
            </a>
          </td>
        </tr>
      {/each}
    </table>
  {/if}
</InnerPanel>

