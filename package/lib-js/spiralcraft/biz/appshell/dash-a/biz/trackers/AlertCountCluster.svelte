<script>
  export let  biz;
  export let alertSet={};
  export let height="fit-content";
</script>

<div class="alert-count-cluster d-flex flex-row" style=" --height: {height}" >
  {#each Object.entries(alertSet).sort((a,b) => biz.alerts.compare(a.code,b.code)) 
    as [code,alerts] }
    {#if alerts && alerts.length>0}
      <div class="badge badge-pill alert-pill" style="--alertColor: {biz.alerts.color(code)}">
        {alerts.length}
      </div>
    {/if}
  {/each}
</div>

<style>
  .alert-count-cluster
  { 
    justify-content: start;
    align-content: start;
    align-items: start;
    column-gap: 0;
    height: var(--height);
    padding: 0;
  }
  
  .alert-pill
  { 
    background-color: var(--alertColor);
    padding: .15rem;
    width: .65rem;
    word-break: break-all;
    white-space: pre-wrap;    
    height: 100%;
  }
</style>