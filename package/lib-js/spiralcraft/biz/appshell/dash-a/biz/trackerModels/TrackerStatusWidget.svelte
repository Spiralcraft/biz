<script>
  import { isDark } from '@vfs/spiralcraft/util/color.js';
  export let status;
  export let classes="";
  export let clickHandler = (status) => {};
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
    class="status-widget d-flex align-content-center justify-content-center {classes}"
    on:click|preventDefault={() => { clickHandler(status) }}
    {...$$restProps}
    >
    <div class="icon">
      <slot name="icon"/>
    </div>
    <div class="status-label d-block my-auto">
      {#if status && status.label}
        {status.label}
      {:else}
        {@html "&nbsp;"}
      {/if}
    </div>
  </span>
{:else if element=="button"}
  <button 
    style="--background: {(status && status.color)?status.color:"#CCCCCC"}; --text-color: {textColor};" 
    class="status-widget d-flex align-content-center justify-content-center {classes}"
    on:click|preventDefault={(e) => { clickHandler(status) }}
    {...$$restProps}
    >
    <div class="icon">
      <slot name="icon"/>
    </div>
    <div class="status-label d-block my-auto">
      {#if status && status.label}
        {status.label}
      {:else}
        {@html "&nbsp;"}
      {/if}
    </div>
  </button>

{/if}

<style>
.status-widget
{ 
  background-color: var(--background);
  color: var(--text-color);
  width: 8em;
  height: 2.25rem;
  display: inline-block;
  font-weight: 500;
  text-align: center;
  padding-top: 0;
  padding-bottom: 0;
  font-size: var(--text-md);
  position: relative;
  border-radius: 4px;
}

.status-widget .icon
{
  position: absolute;
  top: 0;
  right: 0;
  color: var(--text-color);
}
</style>
