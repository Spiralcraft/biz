<script>
  import tooltip from "@vfs/spiralcraft/svelte/utils/tooltip.js";

  export let data=[];
  export let classes="";
  export let tooltipPlacement = "top";
  export let width="";
  export let segmentClasses="";


const tooltipText = (component) =>
{
  if (!component.linkedTracker)
  { return component.name+": Not tracking";
  }
  else if (!component.linkedTracker.status)
  { return component.name+": No status";
  }
  else
  { return component.name+": "+component.linkedTracker.status.label;
  }
}

const color = (component) =>
{
  if (!component.linkedTracker
      || !component.linkedTracker.status
      )
  { return "#CCCCCC";
  }
  else
  { return component.linkedTracker.status.color;
  }
}

</script>

<div class="status-ribbon {classes}" style="--width: {width}">
  {#each data as component}
    <span class="status-ribbon-segment h-100 {segmentClasses}" 
      style="--status-color: {color(component)};
        --status-width: { (1/data.length)*100 }%;
        "
        title="{tooltipText(component)}"
        use:tooltip={{ theme: "translucent", placement: tooltipPlacement, touch:"hold" }} 
      >&nbsp;
    </span>
  {/each}
</div>

<style>
.status-ribbon
{
  width: var(--width);
  border-radius: 4px;
}

.status-ribbon-segment
{
  display: inline-block;
  margin: 0;
  padding: 0;
  background-color: var(--status-color);
  width: var(--status-width);
  overflow: clip;
}
</style>