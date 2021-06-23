<script>
  import { onMount, getContext } from 'svelte';
  
  import TrackerModelForm from "@vfs/app/biz/trackerModels/TrackerModelForm.svelte";
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
  <TrackerModelForm/>
</AbstractCRUDRoute>


