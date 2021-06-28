<script>
  import { onMount, getContext } from 'svelte';
  
  import TrackerModelComponentForm from "@vfs/app/biz/trackerModels/TrackerModelComponentForm.svelte";
  import AbstractCRUDRoute from "@vfs/app/components/AbstractCRUDRoute.svelte";

  const title="Tracker Model Component";

  export let trackerModelId;
  export let id;
  
  const doneRoute="/trackerModels/"+trackerModelId;
  
</script>

<AbstractCRUDRoute
  title={title}
  doneRoute={doneRoute}
  id={id}
  >
  <TrackerModelComponentForm trackerModelId={trackerModelId} />
</AbstractCRUDRoute>


