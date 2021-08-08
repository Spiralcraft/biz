<script>
  import { getContext } from 'svelte';
  const app=getContext("App");
  const biz=getContext("biz");
  
  export let comment={ sourceType: "text", sourceText: ""};
  export let onSave = (comment) => { console.log(JSON.stringify(comment)) }
  export let onQuit = () => { }

  let canSave;
  
</script>

<div class="comment-card adding">
  <div class="controls d-flex flex-row justify-content-end py-2">
    <button 
      disabled={canSave} 
      on:click|preventDefault={()=>{onSave(comment)}}
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
  <textarea class="w-100 comment-input" bind:value={comment.sourceText}/>
</div>

<style>
  .comment-input
  { 
    height: 10rem;
    font-family: Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,
                  Bitstream Vera Sans Mono,Courier New, monospace;
  }
  
  
</style>