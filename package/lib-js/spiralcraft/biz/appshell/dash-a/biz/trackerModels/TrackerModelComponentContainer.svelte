<script>
  import { onMount, getContext, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import dataControllerContext from '@vfs/spiralcraft/data/dataControllerContext.js';

  import TrackerModelComponentForm from "@vfs/app/biz/trackerModels/TrackerModelComponentForm.svelte";

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

<div class="p-1 trackerModelComponentContainer">
  <TrackerModelComponentForm trackerModelId={trackerModelId} {onReset} />
</div>

<style>
  .trackerModelComponentContainer :global(*)
  { transition: none;
  }
</style>