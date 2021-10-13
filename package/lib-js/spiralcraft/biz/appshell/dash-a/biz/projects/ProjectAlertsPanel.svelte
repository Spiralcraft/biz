<script>
  import { getContext } from 'svelte';
  import AlertCard from "@vfs/app/biz/trackers/AlertCard.svelte";

  const biz = getContext("biz");
  
  export let project;
  
  $: load(project);
  
  let alerts=[];
  
  function load(project)
  {
    if (project
        && project.currentRun
        && project.currentRun.tracker
        )
    {
      let tracker=project.currentRun.tracker;
      alerts=[];
      
      if (tracker.activeAlerts)
      { alerts=alerts.concat(tracker.activeAlerts);
      }
      let components=tracker.components;
      if (components)
      {
        if (components)
        { 
          components = components.filter(c => 
            biz.filters.perspective.filter(c.perspectiveIdList)
            );
        }
        for (let comp of components)
        { 
          let subTracker=comp.linkedTracker;
          let compAlerts=subTracker?subTracker.activeAlerts:null;
          if (compAlerts)
          { 
            for (let alert of compAlerts)
            { alert.componentName=comp.name;
            }
            alerts=alerts.concat(compAlerts);
          }
        }
      }
      if (alerts.length>0)
      { alerts=biz.alerts.orderByPriority(alerts);
      }
       
    }  
  }
</script>

{#if project}
  <div class="fw-500">Alerts for all components:</div>
  <div class="alert-scroller d-block overflow-auto h-100 pt-1">
    {#each alerts as alert}
      <AlertCard {alert} title={alert.componentName?alert.componentName:"Main"}/>
    {/each}
  </div>  
{/if}