<script>
  import { getContext } from 'svelte';
  import InnerPanel from '@vfs/app/layout/InnerPanel.svelte';
  import DataBrowser from '@vfs/app/layout/DataBrowser.svelte';
  import { EditIcon,PlusCircleIcon } from 'svelte-feather-icons';
  import cellFormatter from '@spiralcraft/svelte/tabulator/cellFormatter.js';
  import Modal from '@spiralcraft/svelte/modal/Modal.svelte';
  import TrackerModelComponentContainer from '@vfs/app/biz/trackerModels/TrackerModelComponentContainer.svelte';
  
  const app=getContext("App");
  const biz=getContext("biz");
  
  const XSquareIcon = app.icons.xSquare;
  
  export let details;
  export let master;
  export let fitContainer;
  export let onOrderChanged;

  let selectedDetailId;
  let addingDetail;
  
  function detailUpdated(detail)
  { 
    if (detail && detail.id)
    {
      if (!addingDetail)
      { details[details.findIndex( d => d.id==detail.id )]=detail;
      }
      else
      { details.push(detail);
      }
    }
    else
    {
      console.log("deleting "+selectedDetailId);
      if (!addingDetail)
      { 
        const deletedIndex=details.findIndex( d => d.id==selectedDetailId );
        console.log("Deleted index is "+deletedIndex);
        if (deletedIndex>=0)
        { details.splice(deletedIndex,1);
        }
      }
    }
    details=details;
    selectedDetailId=null;
    addingDetail=false;
  }
  
  const orderChanged = (order) =>
  { 
    master.order=order;
    biz.trackerModelView.edited
      (master
      ,(data) => 
        {
          master=data;
          details=data.components;
          if (onOrderChanged)
          { onOrderChanged(master);
          }
        }
      );
    
  }
  
  const add = () => 
    { 
      // app.nav("/trackerModels/"+master.id+"/component/-");
      selectedDetailId=null;
      addingDetail=true;
      trackerModelComponentModal.show
        ({ 
         }
        );
    };
  
  const editAction = (id) => (edit(id));
  
  const edit = (id) =>
    { 
      // app.nav("/trackerModels/"+master.id+"/component/"+id);
      selectedDetailId=id;
      addingDetail=false;
      trackerModelComponentModal.show
        ({ 
         }
        );
    };

  const rowMoved = (row) =>
  {
    console.log("Row moved: "+row.getData().id);
    let order=row.getTable().getRows().map(r => r.getData().id);
    if (!master.order 
        || !master.order.length==order.length
        || !order.every( (v,i) => v === master.order[i] )
       )
    { 
      if (orderChanged)
      { orderChanged(order);
      }
      else
      { console.log("Order changed: "+order);
      }

    }
  }
  
  const columns = 
  [
    { rowHandle:true, formatter: "handle", headerSort:false, frozen: true,
      width:"30", minWidth:"30", maxWidth:"30"
    },
    { title: "Component", field: "name", minWidth:"140", width:"140",
      headerSort: false,
    },
    { title: "Tracker", field: "linkedTrackerModel.name", minWidth:"100", width:"100",
      mutator: (value,data) => 
        (data.linkedTrackerModel?data.linkedTrackerModel.name:""), 
      headerSort: false,
    },
    { title: "Description", field: "description",
      mutator: (value,data) => 
        (data.description?
          data.description:
          data.linkedTrackerModel?
          data.linkedTrackerModel.description:
          ""
        ),  
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
                ctx.target.addEventListener
                  ("click",
                    () =>  editAction(cell.getData().id)
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
    reactiveData: false,
    
  };
  
  let trackerModelComponentModal;
</script>

<InnerPanel title="Tracker Components" fitContainer={fitContainer}>
  <span slot="header-controls">
    <a on:click|preventDefault={add} href="/#">
      <PlusCircleIcon size="1.5x"/>
    </a>
  </span>

  {#if !details || details.length==0}
    <div class="alert alert-primary" role="alert">
      The set of components is empty. Press the '+' button to add one.
    </div>
  {:else}
    <DataBrowser { ...{tableOptions, columns ,data: details} }/>
  {/if}
</InnerPanel>

<Modal bind:this={trackerModelComponentModal} let:options let:close>
  <TrackerModelComponentContainer 
    update={ (data) => { close(); detailUpdated(data);  } }
    onFormReset={ close }
    trackerModelId={master.id} id={selectedDetailId} {options}
  />
</Modal>