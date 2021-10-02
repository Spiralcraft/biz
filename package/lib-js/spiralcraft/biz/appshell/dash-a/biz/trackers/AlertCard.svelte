<script>
  import { getContext } from 'svelte';
  import { XCircleIcon } from 'svelte-feather-icons';

  const biz=getContext("biz");
  export let trash;  
  export let alert={};
  export let title;

  
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

<div class="note-card" style="--alertColor: {biz.alerts.color(alert.code,"#000000")}"
  class:active={alert.active} class:inactive={!alert.active}
  >
  <div class="note-header d-flex flex-row">
    <div class="alert-icon"
      style="--alertColor: {biz.alerts.color(alert.code)};"
      >
      <svelte:component  
        this={biz.alerts.icon(alert.code)} size={"1.5x"}
      />
    </div>
    {#if title}
      <div class="note-title px-1">{title}
      </div>
    {/if}
    <div class="controls ms-auto">
      {#if alert.active && trash}
        <a href="{'#'}"
          on:click|preventDefault={ e => trash(alert) }
          >
          <XCircleIcon size="1.5x"/>
        </a>
      {/if}
    </div>
  </div>
  <div class="note-body pre">
    {alert.note.sourceText}
  </div>
  <div class="note-footer d-flex flex-row text-muted">
    <div class="note-author">{alert.creator.commonName}</div>
    <div class="note-date ms-auto">{compactDate(alert.activatedTime)}</div>
    
  </div>
  {#if alert.deactivatedTime}
    <div class="note-footer d-flex flex-row text-muted">
      {#if alert.deactivator}
        <div class="note-author">{alert.deactivator.commonName}</div>
      {/if}
      <div class="note-date ms-auto">
        deactivated {compactDate(alert.deactivatedTime)}
      </div>
    </div>
  {/if}
    

</div>

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
  
  .alert-icon
  { color: var(--alertColor);
  }
</style>

