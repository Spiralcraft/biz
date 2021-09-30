<script>
  import { getContext } from 'svelte';
  import AlertCard from "@vfs/app/biz/trackers/AlertCard.svelte";

  const biz = getContext("biz");
  
  export let tracker;
  
  function trash(alert)
  { 
    biz.trackerAlertView.call
      (alert.id
      ,"deactivate"
      ,{}
      ,(res) => 
        {
          let index=tracker.alerts.findIndex( a => a.id==alert.id );
          tracker.alerts[index]=res;
          console.log("Index: "+index+" = "+JSON.stringify(res));
          tracker=tracker;
        }
      );
  }

</script>

{#if tracker && tracker.alerts && tracker.alerts.length>0}
  <div class="alert-scroller d-block overflow-auto h-100 pt-1">
    {#each tracker.alerts as detail}
      <AlertCard alert={detail} {trash}/>
    {/each}
  </div>
{/if}

<style>

</style>