import Tabulator from 'tabulator-tables';
import StatusRibbon from '@vfs/app/biz/trackerModels/StatusRibbon.svelte';

const statusFormatter = (cell,params,onRendered) => 
{ 
  cell.getElement().style.paddingTop=0;
  cell.getElement().style.paddingBottom=0;
  let hasTracker=(cell.getData().tracker);
  let status=hasTracker?cell.getData().tracker.status:{};
  
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
  let hasTracker=(cell.getData().tracker);
  let tracker=cell.getData().tracker;
  
  let hasComponents=
    tracker 
    && tracker.componentns
    && tracker.componentns.length>0; 

  cell.getElement().style.paddingTop=0;
  cell.getElement().style.paddingBottom=0;
    
  if (hasComponents)
  { 

    onRendered( ()=> 
      {
        const statusData = tracker.components.map( 
          (c) => (c.tracker?c.tracker.status:{})
          );
        
        const comp=new StatusRibbon
          ({ target: cell.getElement(),
             props: 
              { size: "1x",
                width: "8em", 
                classes: "h-100",
                data: statusData,
              } 
           }
         );
      });
  }
};

export default (row) =>
{
  if (!row.getTable().context
      || !row.getTable().context.indexDetailView.isDetailOpen(row)
     )
  { return;
  }
  let project=row.getData();
  let run=project.currentRun;
  if (run)
  {
    let tracker=run.tracker;
    if (tracker)
    {
      let components=tracker.components;
      if (components && components.length>0)
      {
        var holderEl = document.createElement("div");
        var innerEl = document.createElement("div")
        var tableEl = document.createElement("div");

//        holderEl.style.paddingLeft = "4px";
//        holderEl.style.boxSizing = "border-box";
        holderEl.style.borderLeft = "4px solid #000000";
        
        holderEl.style.paddingTop = "10px";
        holderEl.style.paddingLeft = "10px";
        holderEl.style.paddingBottom = "10px";
        
        innerEl.classList=["shadow-lg"];

//        holderEl.style.borderTop = "1px solid #333";
//        holderEl.style.borderBotom = "1px solid #333";

//        tableEl.style.border = "1px solid #333";

        holderEl.appendChild(innerEl);
        innerEl.appendChild(tableEl);
        
        row.getElement().appendChild(holderEl);

        var subTable = new Tabulator(tableEl, {
            layout:"fitColumns",
            data:components,
            columns:[
            {title:"Component", widthGrow: 1, widthShrink: 1, field:"name"},
            {title:"Status", width: 124, formatter: statusFormatter},
            {title:"Subcomponents", width: 124, formatter: componentStatusFormatter},
            ]
        });

        
        
      }
    }
  }
  
  
 
  
}