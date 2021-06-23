<script>
  import chroma from "chroma-js";
  import { isDark } from '@vfs/spiralcraft/util/color.js';
  export let status;
  export let classes="";
  export let onClick= (status) => {};
  export let element="span";
  
  let textColor="#000000";

  $: {
    if (status && status.color && status.color.length==7)
    { textColor = (isDark(status.color,0.333)?"#FFFFFF":"#000000");
    }
    else
    { textColor = "#FFFFFF";
    }
  }
  
</script>

{#if element=="span"}
  <span 
    style="--background: {(status && status.color)?status.color:"#CCCCCC"}; --text-color: {textColor};" 
    class="status-widget {classes}"
    on:click|preventDefault={() => onClick(status)}
    {...$$restProps}
    >
    {#if status && status.label}
      {status.label}
    {:else}
      {@html "&nbsp;"}
    {/if}
  </span>
{:else if element=="button"}
  <button 
    style="--background: {(status && status.color)?status.color:"#CCCCCC"}; --text-color: {textColor};" 
    class="status-widget {classes}"
    on:click|preventDefault={() => onClick(status)}
    {...$$restProps}
    >
    {#if status && status.label}
      {status.label}
    {:else}
      {@html "&nbsp;"}
    {/if}
  </button>

{/if}

<style>
.status-widget
{ 
  background-color: var(--background);
  color: var(--text-color);
  width: 8em;
  display: inline-block;
  font-weight: 500;
  text-align: center;
}
</style>
