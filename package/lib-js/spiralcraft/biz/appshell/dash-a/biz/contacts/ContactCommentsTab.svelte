<script>
  import { getContext } from 'svelte';
  import InnerPanel from '@vfs/app/layout/InnerPanel.svelte';
  import { EditIcon,PlusCircleIcon,TrashIcon } from 'svelte-feather-icons';
  
  import CommentMiniForm from '@vfs/app/biz/contacts/CommentMiniForm.svelte';
  
  const app=getContext("App");
  const biz=getContext("biz");
  
  const PinIcon=app.icons["pin"];
  
  export let details;
  export let master;
  export let fitContainer;
  
  let adding;

  $: updateDetails(master);
        
  const add = () => 
    { 
      adding=true;
    };
  
  const edit = (id) =>
    {     
    };

  function updateDetails(master)
  {
    if (master)
    {
      biz.contactCommentView.call
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
  }
  
  function onCommentSave(comment)
  { 
    biz.contactCommentView.edited
      ({ ...comment, 
         entityId: master.id 
       }
      ,(data) => 
        { stopEditing(); 
          details=[ data, ...details ];
        }
      );
  }

  function onCommentQuit()
  { stopEditing();
  }  
  
  function compactDate(timestring)
  {
    const date=new Date(timestring);
    return date.toLocaleDateString()
      +" "
      +date.toLocaleTimeString
        ([], { hour: '2-digit', minute: '2-digit' })
        ;
  }
  
</script>

<InnerPanel title="Comments: {master?master.knownAs:''}" fitContainer={fitContainer}>
  <span slot="header-controls">
    <a on:click|preventDefault={add} href="/#">
      <PlusCircleIcon size="1.5x"/>
    </a>
  </span>

  
  {#if !adding && (!details || details.length==0) }
    <div class="alert alert-primary" role="alert">
      No comments. Press the '+' button to add one.
    </div>
  {:else}
    <div class="comment-list d-flex flex-column h-100 overflow-auto">
      {#if adding}
        <CommentMiniForm 
          onSave={onCommentSave}
          onQuit={onCommentQuit}
        />
      {/if}
      {#if details}
        {#each details as detail}
          <div class="comment-card">
            <div class="comment-header d-flex flex-row">
              <div class="controls ms-auto">
                <a href="{'#'}">
                  <PinIcon size="0.875x"/>
                </a>
                <a href="{'#'}">
                  <EditIcon size="0.875x"/>
                </a>
                <a href="{'#'}">
                  <TrashIcon size="0.875x"/>
                </a>
              </div>
            </div>
            <div class="comment-body pre">
              {detail.sourceText}
            </div>
            <div class="comment-footer d-flex flex-row text-muted">
              <div class="comment-author">{detail.creator.commonName}</div>
              <div class="comment-date ms-auto">{compactDate(detail.lastModified)}</div>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</InnerPanel>

<style>
  .comment-card
  {
    border: 1px solid rgb(0 0 0 / 20%);
    padding: 2px 3px 5px 5px;
    margin-right: 2px;
    margin-bottom: 8px;
    box-shadow: 1px 1px 2px 1px rgb(0 0 0 / 20%)
  }
  
  .comment-header
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

  .comment-header
  { margin-top: 2px;
  }
</style>