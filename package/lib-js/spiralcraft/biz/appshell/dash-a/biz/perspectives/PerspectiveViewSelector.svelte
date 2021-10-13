<script>
  import { getContext, onMount } from 'svelte';
  import MultiSelect from '@vfs/app/components/MultiSelect.svelte';
  import Modal from '@spiralcraft/svelte/modal/Modal.svelte'
  import Switch from '@vfs/app/Components/Switch.svelte';

  const app = getContext("App");
  const biz = getContext("biz");

  const GemIcon = app.icons.gem;

  export let filterSubmitted = () => {};

  let perspectives=[];
  let value = biz.filters.perspective.selected;
  
  function refreshPerspectives()
  { biz.perspectiveView.showAll( (data) => { perspectives=data });
  }
  
  function setValue(v)
  {
    biz.filters.perspective.selected = v?v:[];
    console.log(v);
    value=v?v:[];
  }
  
  onMount( () => { refreshPerspectives(); });  

  let modal;
  let iconEnabled=biz.filters.perspective.enabled;
  
</script>

<div class="mx-2 pt-2">
  <a href={"#"} title="Perpective filter: ({iconEnabled?'enabled':'disabled'})"
    on:click|preventDefault={ () => modal.show({}) }
    class:activeIcon={iconEnabled}
    >
    <GemIcon size="1.5x"/>
  </a>
</div>

<Modal bind:this={modal} let:close>
  <div class="d-flex flex-column perspective-modal p-2">
    <div class="d-flex flex-row mb-2">
      <div class="modal-title fw-500 fs-6">
        Filter by Perspective
      </div>
      <button type="button" class="btn btn-primary btn-sm ms-auto"
        on:click|preventDefault={ () => { close(); filterSubmitted(); } }
        >
        Done
      </button>
    </div>
    <div class="switches">
      <div class="enable">
        <Switch channel={biz.filters.perspective.enabledChannel} 
          label="Enable"
          onUpdate={ (val) => iconEnabled=val }
        />
      </div>
    </div>
    <div class="themed perspective-selector">
      <MultiSelect
        setValue={setValue} 
        options={ perspectives }
        value={value}
        valueField={"id"}
        labelField={"name"}
        isSearchable={false}
      />
    </div>
  </div>
</Modal>

<style>
.perspective-modal
{
  min-height: 200px;
  min-width: 100px;
  
}

a.activeIcon
{ 
  color: green;
}
</style>
