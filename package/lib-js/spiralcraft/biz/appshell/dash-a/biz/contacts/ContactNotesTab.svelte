<script>
  import { getContext , onMount } from 'svelte';
  import InnerPanel from '@vfs/app/layout/InnerPanel.svelte';
  import { EditIcon,PlusCircleIcon,TrashIcon } from 'svelte-feather-icons';
  import Modal from '@spiralcraft/svelte/modal/Modal.svelte';
  import NoteMiniForm from '@vfs/app/biz/contacts/NoteMiniForm.svelte';
  import Confirm from '@vfs/app/components/Confirm.svelte';
  
  const app=getContext("App");
  const biz=getContext("biz");
//  const modal = getContext("simple-modal");
  
  const PinIcon=app.icons["pin"];
  
  export let details;
  export let detailDisplay;
  export let master;
  export let fitContainer;
  
  let adding;
  let editingId;

  $: updateDetails(master);
        
  $: detailDisplay = splitPinned(details);
  
  const add = () => 
    { 
      adding=true;
    };
  
  const edit = (id) =>
    { editingId=id;     
    };

  const pin = (id) =>
    { 
      biz.contactNoteView.call
        (id
        ,"togglePinned"
        ,null
        ,(data) => { updateLocal(data) }
        );     
    };

  let modal;
  
  function updateDetails(master)
  {
    console.log("Update details "+JSON.stringify(master));
    if (master)
    {
      biz.contactNoteView.call
        (null
        ,"forEntity?entityId="+master.id
        ,null
        ,(data) => { details=data; }
        );     
    }
    else
    { details=null;
    }
  };
  
  function stopEditing()
  {
    adding=false;
    editingId=null;
  }
  
  function onNoteSave(note)
  { 
    if (adding)
    {
      biz.contactNoteView.edited
        ({ ...note, 
           entityId: master.id 
         }
        ,(data) => 
          { 
            stopEditing(); 
            details=[ data, ...details ];
          }
        );
    }
    else
    {
      biz.contactNoteView.edited
        ({ ...note
         }
        ,(data) => 
          { 
            stopEditing();
            updateLocal(data);
          }
        );
    }
  }

  function onTrashConfirm(note)
  {
    biz.contactNoteView.trashed
      (note.id
      ,()=> { details=details.filter( d => d!=note )  }
      );
  }
  
  function trash(note)
  { 
    console.log("Window width "+window.innerWidth);
    
    modal.show({ onConfirm: () => onTrashConfirm(note) });
  }
  
  function updateLocal(item)
  {
    details=details.map( d =>
      { 
        if (d.id==item.id)
        { return item;
        }
        else
        { return d;
        }
      }
    );
  }
  
  function onNoteQuit()
  { stopEditing();
  }  
  
  function compactDate(timestring)
  {
    const date=new Date(timestring);
    return date.toLocaleDateString();
      +" "
      +date.toLocaleTimeString
        ([], { hour: '2-digit', minute: '2-digit' })
        ;
  }
  
  function splitPinned(details)
  {
    if (!details)
    { return null;
    }
    return [ details.filter( d=>d.pinned )
           , details.filter( d=>!d.pinned)
           ];
  }
  // onMount(() => { updateDetails(master) });
  
</script>

<InnerPanel title="Notes: {master?master.knownAs:''}" fitContainer={fitContainer}>
  <span slot="header-controls">
    <a on:click|preventDefault={add} href="/#">
      <PlusCircleIcon size="1.5x"/>
    </a>
  </span>

  
  {#if !adding && (!details || details.length==0) }
    <div class="alert alert-primary" role="alert">
      No notes. Press the '+' button to add one.
    </div>
  {:else}
    <div class="note-list d-flex flex-column h-100 overflow-auto">
      {#if adding}
        <NoteMiniForm 
          onSave={onNoteSave}
          onQuit={onNoteQuit}
        />
      {/if}
      {#if details}
        {#each detailDisplay as sublist}
          {#each sublist as detail}
            {#if editingId==detail.id}
              <NoteMiniForm
                note={detail}
                onSave={onNoteSave}
                onQuit={onNoteQuit}
              />
            {:else}
              <div class="note-card">
                <div class="note-header d-flex flex-row">
                  <div class="controls ms-auto">
                    <a href="{'#'}" 
                      on:click|preventDefault={ e => pin(detail.id) }
                      class="{detail.pinned?'pinned':''}"
                      >
                      <PinIcon size="0.875x"/>
                    </a>
                    <a href="{'#'}" 
                      on:click|preventDefault={ e => edit(detail.id) }
                      >
                      <EditIcon size="0.875x"/>
                    </a>
                    <a href="{'#'}"
                      on:click|preventDefault={ e => trash(detail) }
                      >
                      <TrashIcon size="0.875x"/>
                    </a>
                  </div>
                </div>
                <div class="note-body pre">
                  {detail.sourceText}
                </div>
                <div class="note-footer d-flex flex-row text-muted">
                  <div class="note-author">{detail.creator.commonName}</div>
                  <div class="note-date ms-auto">{compactDate(detail.lastModified)}</div>
                </div>
              </div>
            {/if}
          {/each}
        {/each}
      {/if}
    </div>
  {/if}
</InnerPanel>

<Modal bind:this={modal}>
  <Confirm
    slot="content"
    title= "Delete Contact Note?"
    message= "Please confirm permanent deletion of the note."
    confirmButtonText= "Confirm"
    cancelButtonText= "Cancel"
  />
</Modal>


<style>
  .note-card
  {
    border: 1px solid rgb(0 0 0 / 20%);
    padding: 2px 3px 5px 5px;
    margin-right: 2px;
    margin-bottom: 8px;
    box-shadow: 1px 1px 2px 1px rgb(0 0 0 / 20%);
    border-radius: 4px;
  }
  
  .note-header
  { margin-bottom: 2px;
  }
  
  .pre 
  {
    display: block;
    unicode-bidi: embed;
    font-family: monospace;
    font-size: var(--text-md);
    white-space: pre-wrap;
    word-wrap: break-word;
    color: #555555;
  }

  .note-header
  { margin-top: 2px;
  }
  
  a.pinned
  {
    color: #009900;
    background-color: #FAFAFA;
    border-bottom: 1px solid;
  }
</style>