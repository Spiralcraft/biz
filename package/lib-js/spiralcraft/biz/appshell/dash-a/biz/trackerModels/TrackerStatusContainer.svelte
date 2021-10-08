<script>
  import { onMount, getContext, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import dataControllerContext from '@vfs/spiralcraft/data/dataControllerContext.js';

  import TrackerStatusForm from "@vfs/app/biz/trackerModels/TrackerStatusForm.svelte";

  export let trackerModelId;
  export let id;
  export let update;
  export let onFormReset;
 
  const key = writable( (id && id!="-")?id:null);

  const onSave = (data) => { update(data) };
  const onTrash = () => { update() };
  const onReset = () => { onFormReset() };
  
  setContext("DataController",dataControllerContext({key,onSave,onTrash}));

</script>

<div class="p-1 trackerStatusContainer">
  <TrackerStatusForm trackerModelId={trackerModelId} {onReset} />
</div>

<style>
  .trackerStatusContainer :global(*)
  { transition: none;
  }
</style>