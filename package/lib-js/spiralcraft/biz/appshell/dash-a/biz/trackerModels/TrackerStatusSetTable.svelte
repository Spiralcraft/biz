<script>
  import { getContext } from 'svelte';
  import InnerPanel from '@vfs/app/layout/InnerPanel.svelte';
  import DataBrowser from '@vfs/app/layout/DataBrowser.svelte';
  import { EditIcon,PlusCircleIcon } from 'svelte-feather-icons';
  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte';

  const app=getContext("App");
  
  export let details;
  export let master;
  
  const add = () => 
    { app.nav("/trackerModels/"+master.id+"/status/-");
    };
  
  const edit = (id) =>
    { app.nav("/trackerModels/"+master.id+"/status/"+id);    
    };
  
</script>

<InnerPanel title="Status Set">
  <span slot="header-controls">
    <a on:click|preventDefault={add} href="/#">
      <PlusCircleIcon size="1.5x"/>
    </a>
  </span>

  {#if !details || details.length==0}
    <div class="alert alert-primary" role="alert">
      The set of status items is empty. Press the '+' button to add one.
    </div>
  {:else}
    <table class="table table-bordered">
      <colgroup>
        <col span="1" width="8em"/>
        <col span="1"/>
        <col span="1" width="2em"/>
      </colgroup>
      {#each details as detail}
        <tr>
          <td>
            <TrackerStatusWidget status={detail} onClick={(status) => edit(status.id)}/>
          </td>
          <td>
            <div>{detail.description}</div>
          </td>
          <td>
            <a href="/#" on:click|preventDefault={edit(detail.id)}>
              <EditIcon size="1.3x"/>
            </a>
          </td>
        </tr>
      {/each}
    </table>
  {/if}
</InnerPanel>

