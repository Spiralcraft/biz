<script>
  import { onMount, getContext } from 'svelte';
  
  import TrackerStatusForm from "@vfs/app/biz/trackerModels/TrackerStatusForm.svelte";
  import AbstractCRUDRoute from "@vfs/app/components/AbstractCRUDRoute.svelte";

  const title="Tracker Status";

  export let trackerModelId;
  export let id;
  
  const doneRoute="/trackerModels/"+trackerModelId;
  
</script>

<AbstractCRUDRoute
  title={title}
  doneRoute={doneRoute}
  id={id}
  >
  <TrackerStatusForm trackerModelId={trackerModelId} />
</AbstractCRUDRoute>


