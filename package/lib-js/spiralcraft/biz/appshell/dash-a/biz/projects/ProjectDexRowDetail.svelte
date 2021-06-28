<script>
  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte'
  import StatusRibbon from '@vfs/app/widgets/StatusRibbon.svelte';
  import DataBrowser from '@vfs/app/layout/DataBrowser.svelte';
  export let row;
  let project=row.getData();
  
  
  const statusFormatter = (cell,params,onRendered) => 
  { 
    cell.getElement().style.paddingTop=0;
    cell.getElement().style.paddingBottom=0;
    let hasTracker=cell.getRow().tracker;
    let status=hasTracker?cell.getRow().tracker.status:{};
    
    if (hasTracker)
    {  
      onRendered( () => 
      {
         // cell.getElement().style.padding=0;
         const comp=new TrackerStatusWidget
           ({ target: cell.getElement()
             , props: 
               { status: status
               , classes: "d-block h-100"
               } 
           });
         
      });
    }

  }

  const componentStatusFormatter = (cell,formatterParams,onRendered) => 
  {
    const statusColors = ["grey","green","yellow","red","blue"];
  
    let hasTracker=(cell.getData().tracker);

    cell.getElement().style.paddingTop=0;
    cell.getElement().style.paddingBottom=0;
      
    if (hasTracker)
    { 
  
      onRendered( ()=> 
        {
          
          const comp=new StatusRibbon
            ({ target: cell.getElement(),
               props: 
                { size: "1x",
                  width: "8em", 
                  classes: "h-100",
                  data: [{ status: 0, tooltip:"Not started"},
                         { status: 1, tooltip:"In Process"},
                         { status: 2, tooltip:"Waiting"},
                         { status: 3, tooltip:"Problem"},
                         { status: 4, tooltip:"Finished"},
                        ],
                  colors: statusColors
                } 
             }
           );
        });
    }
  }

  const columns =
  [
    {title:"Name",field:"name",widthGrow: 1,widthShrink: 1},
    {title:"Status",field:"currentRun",width:"124",formatter:statusFormatter},
    {title:"Components",field:"currentRun",width:"124",formatter:componentStatusFormatter},
  ];

    
  let components 
    = (project.currentRun
        && project.currentRun.tracker
        && project.currentRun.tracker.components
        && project.currentRun.tracker.components.length>0
      )?project.currentRun.tracker.components
      :null;
      
</script>

{#if components}
  <div class="tracker-component-table">
    <table class="table">
      {#each components as component}
        <tr>
          <td>{component.name}
          </td>
          <td><TrackerStatusWidget status={component.tracker?component.tracker.status:{}}/>
          </td>
        </tr>
      {/each}
    </table>
  </div>
{/if}