<script>
  import { getContext, onMount } from 'svelte';
  import InnerPanel from '@vfs/app/layout/InnerPanel.svelte';
  import { XIcon, PlusCircleIcon,TrashIcon } from 'svelte-feather-icons';
    
  const app=getContext("App");
  const biz=getContext("biz");
    
  export let details;
  export let master;
  export let fitContainer;
  let tags=[];
  let selectedTag;
  let tagToAdd;
  
  let adding;

  $: updateDetails(master);
        
  $: adding = selectedTag && !selectedTag.id;
  
  function updateDetails(master)
  {
    if (master)
    {
      biz.contactTaggedView.call
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
  
  
  function compactDate(timestring)
  {
    const date=new Date(timestring);
    return date.toLocaleDateString();
  }
  
  
  onMount(()=>
    { 
      biz.contactTagView.showAll( (data) => { tags=data } ); 
      // updateDetails(master);
    }
  );
  
  function createAndAddTag(label)
  {
    if (label)
    {
      biz.contactTagView.edited
        ({ label: label }
        ,(data) => 
          { 
            tags.push(data); 
            addTag(data.id);
            selectedTag=null;
            adding=false;
          }
        );
    }
  }
  
  function addTag(tagId)
  {
    biz.contactTaggedView.edited
      ({ entityId: master.id,
         tagId: tagId
       }
      ,(data) => { details=[ data, ...details] }
      );
  }
  
  function add(e)
  {
    if (selectedTag)
    {
      if (selectedTag.id)
      { addTag(selectedTag.id);
      }
      else
      { adding=true;
      }
    }
  }
  
  function deleteTag(id)
  {
    biz.contactTaggedView.trashed
      (id
      ,() => 
        { details=details.filter
          ( (e) => e.id!=id 
          ) 
        }
      );
  }
  
  function clearAdding()
  {
    adding=false; 
    selectedTag=null;
  }
  
  function validNewTag(tagToAdd)
  {
    let searchTagToAdd 
      = tagToAdd?tagToAdd.trim().toLowerCase().replace(' ','_'):null;

    return searchTagToAdd 
      && !tags.find( e => e.searchLabel == searchTagToAdd);
  }
  
</script>

<InnerPanel title="Tags: {master?master.knownAs:''}" fitContainer={fitContainer}>
  
  <div class="tag-list d-flex flex-column h-100 overflow-auto">
    
    {#if tags}
      <div class="tag-add w-100 p-1 d-flex flex-row flex-nowrap">
        {#if !adding}
          <select bind:value={selectedTag}
            class="form-select w-100 py-0 me-1"
            >
            <option value={null}>
              (select tag)
            </option>
            {#each tags as tag}
              <option value={tag} disabled={details && details.find( (e)=> e.tagId == tag.id )}>
                {tag.label}
              </option>
            {/each}
            <option value={{ label: ""}}>
              (add new tag)
            </option>
          </select>
          <a on:click|preventDefault={add} href="/#" disabled={!selectedTag}>
            <PlusCircleIcon size="1.5x"/>
          </a>
        {:else}
          <input type="text" class="form-control w-100 py-0 me-1" bind:value={tagToAdd}/>
          <a on:click|preventDefault={(e) => {createAndAddTag(tagToAdd)}} href="/#"
            disabled={!validNewTag(tagToAdd)}
            on:input={ (e) => tagToAdd = e.target.value }
            >
            <PlusCircleIcon size="1.5x"/>
          </a>
          <a on:click|preventDefault={clearAdding} href="/#">
            <XIcon size="1.5x"/>
          </a>
        {/if}
        

      </div>
    {/if}
    {#if details}
      {#each details as detail}
        <div class="tag-card w-100 d-flex flex-row">
          <div class="tag-card-tag d-inline-block">
            {detail.tagLabel}
          </div>
          <div class="tag-card-meta d-inline-block ms-auto justify-self-end">
            <span class="tag-author">{detail.creator.commonName}</span>
            <span class="tag-date">{compactDate(detail.createdOn)}</span>          
            <a on:click|preventDefault={() => {deleteTag(detail.id)}} href="/#">
              <TrashIcon size="1.5x"/>
            </a>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</InnerPanel>

<style>
  .tag-card
  {
    padding: 2px 3px 5px 5px;
    margin-right: 0px;
    margin-bottom: 4px;
  }
  
  .tag-add, .tag-add input, .tag-add select
  {
    font-size: var(--text-md);
    margin-bottom: 5px;
  }

  .tag-add a[disabled="true"]
  { 
    color: #DDDDDD;
  }
  
  .tag-author, .tag-date
  { color: #555555;
  }
  
  .tag-card-tag
  {
    border-radius: 1em;
    background-color: #0000FF;
    color: #FFFFFF;
    padding: 1px 5px;
  }
  
</style>