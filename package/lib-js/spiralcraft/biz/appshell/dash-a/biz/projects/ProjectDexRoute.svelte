<script>
  import { getContext } from 'svelte';
  import AbstractDexRoute from '@vfs/app/components/AbstractDexRoute.svelte';
  import ProjectDetailPanel from '@vfs/app/biz/projects/ProjectDetailPanel.svelte';
  import runStatus from '@vfs/app/biz/projects/runStatus.js'
  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte'
  import StatusRibbon from '@vfs/app/biz/trackerModels/StatusRibbon.svelte';
  import ProjectDexRowDetail from '@vfs/app/biz/projects/ProjectDexRowDetail.svelte';
  import trackerTableRenderer from '@vfs/app/biz/projects/trackerTableRenderer.js';
  import AlertCountCluster from '@vfs/app/biz/trackers/AlertCountCluster.svelte';
  import PerspectiveViewSelector from '@vfs/app/biz/perspectives/PerspectiveViewSelector.svelte';
  
  const app=getContext("App");
  const biz=getContext("biz");

  const hasDetail = (cell) =>
  {
    let project=cell.getRow().getData();
    return project.currentRun
      && project.currentRun.tracker
      && project.currentRun.tracker.components
      && project.currentRun.tracker.components.length>0;
  }
  
  
  const statusFormatter = (cell,params,onRendered) => 
  { 
    cell.getElement().style.paddingTop=0;
    cell.getElement().style.paddingBottom=0;
    let run=cell.getRow().getData().currentRun;
    let hasTracker=(run && run.tracker);
    let status=hasTracker?run.tracker.status:{};
    
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
  
  const statusMutator = (value, data, type, params, component) => 
  { 
    if (!value) data.currentRun={};
    return !value?{}:value;
  }
  
  const alertsFormatter = (cell,formatterParams,onRendered) =>
  {
    const alerts=biz.alerts.sort();
    
    let run=cell.getRow().getData().currentRun;
    let tracker=run?run.tracker:null;
    let mainAlerts=(tracker && tracker.activeAlerts)?tracker.activeAlerts:null;
    if (mainAlerts)
    { biz.alerts.sort(mainAlerts,alerts);
    }
    let components=tracker?tracker.components:null;
    if (components)
    {
      for (let comp of components)
      { 
        if (biz.filters.perspective.filter(comp.perspectiveIdList))
        {
          let subTracker=comp.linkedTracker;
          let compAlerts=subTracker?subTracker.activeAlerts:null;
          if (compAlerts)
          { biz.alerts.sort(compAlerts,alerts);
          }
        }
      }
    }
    
    onRendered( () =>
      {
        cell.getElement().style.paddingTop=0;
        cell.getElement().style.paddingBottom=0;      
        const comp=new AlertCountCluster
          ({target: cell.getElement(),
            props:
              { alertSet: alerts,
                biz: biz,
                height: "29px",
              }
          });      
      }
    );
  }
  
  const componentStatusFormatter = (cell,formatterParams,onRendered) => 
  {
    const statusColors = ["grey","green","yellow","red","blue"];
  
    const run=cell.getRow().getData().currentRun;
    const hasTracker=(run && run.tracker);
    const hasComponents
      =hasTracker 
        && run.tracker.components 
        && run.tracker.components.length>0;

    const filteredComponents
      =hasComponents
        ?run.tracker.components.filter
          (c => biz.filters.perspective.filter(c.perspectiveIdList))
        :[];
    cell.getElement().style.paddingTop=0;
    cell.getElement().style.paddingBottom=0;
      
    if (hasComponents)
    { 
  
      onRendered( ()=> 
        {
          const comp=new StatusRibbon
            ({ target: cell.getElement(),
               props: 
                { size: "1x",
                  width: "8em", 
                  classes: "h-100",
                  data: filteredComponents,
                } 
             }
           );
        });
      }
  };

  
  const expanderFormatter = () =>
  {
    const icon=app.icons["list"];
    
    
    return (cell,params,onRendered) => 
    { 
      if (hasDetail(cell))
      {
        onRendered(() => 
         { 
           const inner=document.createElement("div");
           cell.getElement().appendChild(inner);
           inner.addEventListener("click",(e) => { expanderUsed(e,cell) });
           const iconO=new icon({ target: inner, props: { size: "1x" }});
           // iconO.$on("click",(e) => { expanderUsed(e,cell) });
           if (cell.getTable().context.indexDetailView.isDetailOpen(cell.getRow()))
           { 
             cell.getElement().style.background="#007BFF";
             cell.getElement().style.color="#FFFFFF";
           }
           else
           {
             cell.getElement().style.background=undefined;
             cell.getElement().style.color=undefined;
           }
         
         });
      }
    }
  }
  
  const expanderUsed = (e,cell) => 
  { 
    const idv=cell.getTable().context.indexDetailView;
    idv.toggleDetail(cell); 
    if (idv.isDetailOpen(cell.getRow()))
    { cell.getTable().context.indexDetailView.moveCursorToRow(cell.getRow());
    }
  }
  
  const columns =
  [
    {title:"Name",field:"name",widthGrow: 1,widthShrink: 1,
      cellClick: (e,cell) => 
        { cell.getTable().context.indexDetailView.focusRowCallout(cell.getRow(),"info") 
        }
    },
    {title:"Customer",field:"customer.name",widthGrow: 1,widthShrink: 2,
      cellClick: (e,cell) => 
        { cell.getTable().context.indexDetailView.focusRowCallout(cell.getRow(),"info") 
        }
    },
    {title:"",minWidth:"24",width:"24",maxWidth:"24",
      formatter:expanderFormatter(), 
      headerSort: false, 
      cellClick: () => {},
      cellTap: () => {},
    },
    {title:"Status",field:"currentRun",width:"124",mutator:statusMutator,
      formatter:statusFormatter, headerSort:false,
      cellClick: (e,cell) => 
        { cell.getTable().context.indexDetailView.focusRowCallout(cell.getRow(),"tracker") 
        }
       
    },
    {title:"Components",field:"currentRun",width:"124",mutator:statusMutator,
      formatter:componentStatusFormatter, headerSort:false, 
      cellClick: (e,cell) => 
        { cell.getTable().context.indexDetailView.focusRowCallout(cell.getRow(),"tracker") 
        }
    },
    {title:"Alerts",field:"currentRun",width:"58",mutator:statusMutator,
      formatter:alertsFormatter,headerSort:false,
      cellClick: (e,cell) => 
        { cell.getTable().context.indexDetailView.focusRowCallout(cell.getRow(),"alerts") 
        }
    },
  ]
  const dataView=biz.projectView;
  
  const detailRoute="/projects";
  const activityTitle = "Project List";
  const panelTitle = "Projects";

  const formatRow = (row) =>
  {
    trackerTableRenderer(row,{biz,app});    
  }
  
  const props = 
  { 
    columns,
    dataView,
    detailRoute,
    activityTitle,
    panelTitle,
    formatRow,
    selectable: false,
    hSplitXl: 8,
    hSplitLg: 7,
    hSplitMd: 7,
  }
  
  let refresh;
</script>


<AbstractDexRoute { ...props } let:calloutFocus bind:refresh>
  <svelte:fragment slot="activity-controls">
    <PerspectiveViewSelector filterSubmitted={refresh}/>
  </svelte:fragment>

  <ProjectDetailPanel slot="detail-callout"
    create={false}
    embedded={true}
    active={calloutFocus}
  />
</AbstractDexRoute>
