<script>
  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte';
  
  export let status;
  export let trackerModel;
  export let updateStatus = (s) => { status=s; };
  const statusSelected = (s) => { status=s; updateStatus(s); };
</script>

<div class="dropdown">
  <button data-bs-toggle="dropdown" aria-expanded="false" type="button"
    class="status-button btn btn-secondary dropdown-toggle 
      dropdown-toggle-split p-0 pe-1"
    >
    <div class="d-inline-block">
      <TrackerStatusWidget
        status={status} 
        classes="me-1 rounded-1"
      />
    </div>
  </button>
  <ul class="dropdown-menu status-menu" aria-labelledby="status-dropdown">
  {#if trackerModel}
    {#each [ {}, ...trackerModel.statusSet ] as status}
      <li>
        <a class="dropdown-item status-select-item" href="/#" 
          title='{status.description?status.description:"No Status"}'
          on:click|preventDefault=
            {(e) => {statusSelected(status)}
            }
          >
          <TrackerStatusWidget status={status}/>
        </a>
      </li>
    {/each}
  {/if}
  </ul>
</div>

<style>
.dropdown
{ padding: 0;
}
</style>