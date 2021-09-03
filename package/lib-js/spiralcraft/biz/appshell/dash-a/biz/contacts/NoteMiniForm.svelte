<script>
  import { getContext } from 'svelte';
  const app=getContext("App");
  const biz=getContext("biz");
  
  export let note={ sourceType: "text", sourceText: ""};
  export let onSave = (note) => { console.log(JSON.stringify(note)) }
  export let onQuit = () => { }

  let canSave;
  
</script>

<div class="note-card adding">
  <div class="controls d-flex flex-row justify-content-end py-2">
    <button 
      disabled={canSave} 
      on:click|preventDefault={()=>{onSave(note)}}
      type="button"
      role="button"
      class="btn btn-sm btn-primary ms-1"
      >
      Done
    </button>
    
    <button
      class="btn btn-sm btn-secondary ms-1"
      on:click|preventDefault={onQuit}
      type="button"
      role="button"
      >
      Reset
    </button>
    
  </div>
  <textarea class="w-100 note-input" bind:value={note.sourceText}/>
</div>

<style>
  .note-input
  { 
    height: 10rem;
    font-family: Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,
                  Bitstream Vera Sans Mono,Courier New, monospace;
  }
  
  .controls .btn
  {
    padding: 0 .5rem;
    font-size: .750rem;
  }
</style>