<script>
  import { getContext } from 'svelte';
  import LogCard from '@vfs/app/biz/trackers/LogCard.svelte';
  
  const biz = getContext("biz");
  
  export let tracker;
  
  $: load(tracker)
  
  let entries=[];
  
  function load(tracker)
  {
    biz.trackerLogView.call
      (null,
      "forEntity",
      { entityId: tracker.id },
      (data) => { entries=data }
      );      
  }
  
</script>

<div class="tracker-log-tab h-100 overflow-auto pt-1">
  {#if entries && entries.length>0}
    <div class="log-scroller d-block overflow-auto h-100 pt-1">
      {#each entries as entry}
        <LogCard {entry}/>
      {/each}
    </div>
  {/if}
</div>

