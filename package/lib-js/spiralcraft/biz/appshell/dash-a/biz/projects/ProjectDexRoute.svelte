<script>
  import { getContext } from 'svelte';
  import AbstractDexRoute from '@vfs/app/components/AbstractDexRoute.svelte';
  import ProjectForm from '@vfs/app/biz/projects/ProjectForm.svelte';
  import runStatus from '@vfs/app/biz/projects/runStatus.js'
  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte'
  import StatusRibbon from '@vfs/app/widgets/StatusRibbon.svelte';
  
  const biz=getContext("biz");

  const statusFormatter = (cell,params,onRendered) => 
  { 
    let run=cell.getRow().getData().currentRun;
    let hasTracker=(run && run.tracker);
      
    if (hasTracker)
    { 
      onRendered( () => 
      {
         // cell.getElement().style.padding=0;
         const comp=new TrackerStatusWidget
           ({ target: cell.getElement()
             , props: 
               { status: run.tracker.status
               , classes: "d-block h-100"
               } 
           });
         
      });

      return "";
    }
    else 
      return runStatus(cell.getRow().getData());

  }
  
  const statusMutator = (value, data, type, params, component) => 
  { 
    if (!value) data.currentRun={};
    return !value?{}:value;
  }
  
  const componentStatusFormatter = (cell,formatterParams,onRendered) => 
  {
    const statusColors = ["grey","green","yellow","red","blue"];
  
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
  };

  
  const columns =
  [
    {title:"Name",field:"name",widthGrow: 1,widthShrink: 1},
    {title:"Customer",field:"customer.name",widthGrow: 1,widthShrink: 2},
    {title:"Status",field:"currentRun",width:"124",mutator:statusMutator,formatter:statusFormatter},
    {title:"Components",field:"currentRun",width:"124",mutator:statusMutator,formatter:componentStatusFormatter},
  ]
  const dataView=biz.projectView;
  
  const detailRoute="/projects";
  const activityTitle = "Project List";
  const panelTitle = "Projects";

  const props = 
  { 
    columns,
    dataView,
    detailRoute,
    activityTitle,
    panelTitle,
  }
</script>


<AbstractDexRoute { ...props }>
  <ProjectForm slot="detail-callout"
    create={false}
    embedded={true}
  />
</AbstractDexRoute>
