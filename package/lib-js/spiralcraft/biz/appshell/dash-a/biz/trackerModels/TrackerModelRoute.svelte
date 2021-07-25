<script>
  import { onMount, getContext } from 'svelte';
  
  import TrackerModelDetailPanel from "@vfs/app/biz/trackerModels/TrackerModelDetailPanel.svelte";
  import AbstractCRUDRoute from "@vfs/app/components/AbstractCRUDRoute.svelte";

  const title="Tracker Admin";
  const doneRoute="/trackerModels";

  export let id;
  
  
</script>

<AbstractCRUDRoute
  title={title}
  doneRoute={doneRoute}
  id={id}
  >
  <TrackerModelDetailPanel/>
</AbstractCRUDRoute>


