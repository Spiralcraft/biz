<script>
  import { getContext } from 'svelte';
  import { XCircleIcon } from 'svelte-feather-icons';

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
  
  function compactDate(timestring)
  {
    const date=new Date(timestring);
    return date.toLocaleDateString();
      +" "
      +date.toLocaleTimeString
        ([], { hour: '2-digit', minute: '2-digit' })
        ;
  }  
  



</script>

{#if tracker && tracker.alerts && tracker.alerts.length>0}
  <div class="alert-scroller d-block overflow-auto h-100 pt-1">
    {#each tracker.alerts as detail}
      <div class="note-card" style="--alertColor: {biz.alerts.color(detail.code,"#000000")}"
        class:active={detail.active} class:inactive={!detail.active}
        >
        <div class="note-header d-flex flex-row">
          <div class="alert-icon">
            <svelte:component class="{biz.alerts.colorClass(detail.code)}" 
              this={biz.alerts.icon(detail.code)} size={"1.5x"}
            />
          </div>
          <div class="controls ms-auto">
            {#if detail.active}
              <a href="{'#'}"
                on:click|preventDefault={ e => trash(detail) }
                >
                <XCircleIcon size="1.5x"/>
              </a>
            {/if}
          </div>
        </div>
        <div class="note-body pre">
          {detail.note.sourceText}
        </div>
        <div class="note-footer d-flex flex-row text-muted">
          <div class="note-author">{detail.creator.commonName}</div>
          <div class="note-date ms-auto">{compactDate(detail.activatedTime)}</div>
          
        </div>
        {#if detail.deactivatedTime}
          <div class="note-footer d-flex flex-row text-muted">
            {#if detail.deactivator}
              <div class="note-author">{detail.deactivator.commonName}</div>
            {/if}
            <div class="note-date ms-auto">
              deactivated {compactDate(detail.deactivatedTime)}
            </div>
          </div>
        {/if}
          

      </div>
  
    {/each}
  </div>
{/if}

<style>
  .note-card
  {
    border: 1px solid rgb(0 0 0 / 20%);
    padding: 2px 3px 5px 5px;
    margin-right: 2px;
    margin-bottom: 8px;
    box-shadow: 1px 1px 2px 1px rgb(0 0 0 / 20%);
    border-radius: 4px;
  }
  
  .note-card.inactive
  {
    background-color: #DDDDDD;
    color: #333333;
  }
  
  .note-card.active
  {
    border-left: 4px solid var(--alertColor);
  }
  
  .note-header
  { 
    margin-bottom: 2px;
    margin-top: 2px;
  }
  
  .pre 
  {
    display: block;
    unicode-bidi: embed;
    font-family: monospace;
    font-size: var(--text-md);
    white-space: pre-wrap;
    word-wrap: break-word;
    color: #555555;
  }

</style>