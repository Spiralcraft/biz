<script>
  import { getContext } from 'svelte';
  import LogCard from "@vfs/app/biz/trackers/LogCard.svelte";

  const biz = getContext("biz");
  
  export let project;
  
  $: load(project);
  
  let entries=[];

  function fetchLogsForTracker(tracker,compName)
  {  
    biz.trackerLogView.call
      (null
      ,"forEntity"
      ,{ entityId: tracker.id }
      ,(data) => 
        { 
          if (compName)
          {
            for (let entry of data)
            { entry.componentName=compName;
            }
          }
          entries=entries.concat(data);
          entries=entries.sort( (a,b) => strcmp(a,b) );
        }
      );
  
  }

  function strcmp(a,b)
  {
    if (a==b)
    { return 0;
    }
    else if (a<b)
    { return 1;
    }  
  }
  
  function load(project)
  {
    if (project
        && project.currentRun
        && project.currentRun.tracker
        )
    {
      let tracker=project.currentRun.tracker;
      entries=[];
      fetchLogsForTracker(tracker);
        
      let components=tracker.components;
      if (components)
      {
        for (let comp of components)
        { 
          let subTracker=comp.linkedTracker;
          if (subTracker)
          { fetchLogsForTracker(subTracker,comp.name);
          }
        }
      }
       
    }  
  }
</script>

{#if project}
  <div class="fw-500">Log entries for all components:</div>
  <div class="log-scroller d-block overflow-auto h-100 pt-1">
    {#each entries as entry}
      <LogCard {entry} title={entry.componentName?entry.componentName:"Main"}/>
    {/each}
  </div>  
{/if}