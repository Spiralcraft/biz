<script>
  import { getContext } from 'svelte';
  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte';

  const biz=getContext("biz");

  export let title;
  export let entry;

  function compactDate(timestring)
  {
    const date=new Date(timestring);
    return date.toLocaleDateString()
      +" "
      +date.toLocaleTimeString
        ([], { hour: '2-digit', minute: '2-digit' })
        ;
  } 
</script>

{#if entry}
  <div class="entry-card">
    <div class="entry-header d-flex flex-row">
      {#if entry.alert}
        <div class="alert-icon me-1"
          class:unalert={entry.eventTag=="unalert"}
          >
          <svelte:component 
            class="{biz.alerts.colorClass(entry.alert.code)}" 
            this={biz.alerts.icon(entry.alert.code)} size={"1.5x"}
          />
        </div>
      {/if}
      {#if title}
        <span class="entry-context-title fw-500 pe-1">{title}: 
        </span>
      {/if}
      <span class="entry-title">
        {biz.trackerLogView.api.eventTitle(entry.eventTag)}
      </span>
    </div>
    {#if entry.note}
      <div class="entry-body pre note-entry">
        {entry.note.sourceText}
      </div>
    {:else if entry.status}
      <div class="entry-body">
        <TrackerStatusWidget status={entry.status}/>
      </div>
    {:else if entry.alert}
      <div class="entry-body pre note-entry">
        {entry.alert.note.sourceText}
      </div>
    {/if}
    <div class="entry-footer d-flex flex-row text-muted">
      <div class="entry-date">{compactDate(entry.timestamp)}</div>
      <div class="entry-user ms-auto">{entry.user.commonName}</div>
      
    </div>
  </div>
{/if}

<style>

.entry-card
{
  border: 1px solid rgb(0 0 0 / 20%);
  padding: 2px 3px 5px 5px;
  margin-right: 2px;
  margin-bottom: 8px;
  box-shadow: 1px 1px 2px 1px rgb(0 0 0 / 20%);
  border-radius: 4px;
}

.entry-header
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

.entry-body.note-entry
{
  padding-left: 4px;
  border-left: 1px solid #CCCCCC;
}

.alert-icon.unalert
{
  opacity: 0.5;
}

</style>
