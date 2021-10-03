<script>
  import { getContext } from 'svelte';
  import InnerPanel from '@vfs/app/layout/InnerPanel.svelte';
  import DataBrowser from '@vfs/app/layout/DataBrowser.svelte';
  import { EditIcon,PlusCircleIcon } from 'svelte-feather-icons';
  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte';
  import cellFormatter from '@spiralcraft/svelte/tabulator/cellFormatter.js';
  

  const app=getContext("App");
  const biz=getContext("biz");
  
  export let details;
  export let master;
  export let fitContainer;
  export let onOrderChanged;
  
  const add = () => 
    { app.nav("/trackerModels/"+master.id+"/status/-");
    };
  
  const edit = (id) =>
    { app.nav("/trackerModels/"+master.id+"/status/"+id);    
    };
  

  const orderChanged = (statusOrder) =>
  { 
    master.statusOrder=statusOrder;
    biz.trackerModelView.edited
      (master
      ,(data) => 
        {
          master=data;
          details=data.statusSet;
          if (onOrderChanged)
          { onOrderChanged(master);
          }
        }
      );
    
  }  
  
  const rowMoved = (row) =>
  {
    console.log("Row moved: "+row.getData().id);
    let statusOrder=row.getTable().getRows().map(r => r.getData().id);
    if (!master.statusOrder 
        || !master.statusOrder.length==statusOrder.length
        || !statusOrder.every( (v,i) => v === master.statusOrder[i] )
       )
    { 
      if (orderChanged)
      { orderChanged(statusOrder);
      }
      else
      { console.log("Order changed: "+order);
      }

    }
  };

  function statusFormatter(cell,params,onRendered)
  {
    
    onRendered(() => 
     {
        cell.getElement().style.padding="0";
        new TrackerStatusWidget(
          { target: cell.getElement(), 
            props: { status: cell.getRow().getData() }
          });
     });
  }
   
  const columns = 
  [
    { rowHandle:true, formatter: "handle", headerSort:false, frozen: true,
      width:"30", minWidth:"30", maxWidth:"30"
    },
    { title: "Status", field: "name", minWidth:"106", width:"106",
      headerSort: false,
      formatter: statusFormatter,
    },
    { title: "Description", field: "description",
      headerSort: false,
    },
    { title: "", minWidth:"24",width:"24",maxWidth:"24",
      headerSort: false,
      formatter: 
        cellFormatter(
          { component: EditIcon,
            props: { size: "1.3x" },
            beforeRender: (cell,ctx) => 
              {
                ctx.target.style.color="#0d6efd";
                ctx.target.addEventListener
                  ("click",
                    () =>  { edit(cell.getData().id) }
                  );  
                return ctx;
              },
          }),
    },
  ];
  
  const tableOptions =
  {
    movableRows: true,
    rowMoved,
    
  };  
</script>

<InnerPanel title="Status Set" fitContainer={fitContainer}>
  <span slot="header-controls">
    <a on:click|preventDefault={add} href="/#">
      <PlusCircleIcon size="1.5x"/>
    </a>
  </span>

  {#if !details || details.length==0}
    <div class="alert alert-primary" role="alert">
      The set of status items is empty. Press the '+' button to add one.
    </div>
  {:else}
    <DataBrowser { ...{tableOptions, columns ,data: details} }/>
  {/if}
</InnerPanel>

