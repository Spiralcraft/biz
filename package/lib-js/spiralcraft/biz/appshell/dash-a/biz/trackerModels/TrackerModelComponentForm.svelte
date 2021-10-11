<script>
  import { getContext } from "svelte";
  import AbstractCRUDForm from "@vfs/app/components/AbstractCRUDForm.svelte";
  import Select from "@vfs/app/form/svelteSelect/Select.svelte";
  
  import 
    {
      FormField,
      InputGroup,
      TextInput, 
      TextArea, 
      CheckInput, 
      SelectInput, 
      Errors
    } from '@vfs/app/form/form.js';

  //  import createValidator from "./customerValidator";

  const biz=getContext("biz");

  const title = "Tracker Model Component";
  const validator=undefined;
  const dataView=biz.trackerModelComponentView;
  const cleanEdited = (values) => values;
  const cleanLoaded = (values) => 
    {
      if (!values.perspectiveIdList)
      { values.perspectiveIdList=[];
      }
      return values;
    };
    
  export let create;
  export let embedded=false;
  
  export let trackerModelId;
  export let onReset;
  
  console.log("trackerModelId "+trackerModelId);
  const initial = 
    { trackerModelId: trackerModelId, 
      id: "",
      name: "",
      linkedTrackerModelId:"", 
      description:"", 
      detailedDescription:"",
      perspectiveIdList:[],
    };
    
  const dataController = getContext("DataController");

  const defaultEditEnabled=true;
  
  const props = 
  { initial,
    title,
    validator,
    dataView,
    create,
    embedded,
    cleanEdited,
    defaultEditEnabled,
    cleanLoaded,
    onReset,
  }
  
  const key = dataController.key;
  
  let reset;

  let trackerModels=[];
  const trackerModelView=biz.trackerModelView;
  const refreshTrackerModels 
    = trackerModelView.showAll( (data) => { trackerModels=data } );

  let perspectives=[];
  const refreshPerspectives = biz.perspectiveView.showAll( (data) => { perspectives=data });
  
</script>

<AbstractCRUDForm 
  {...props}
  let:errors
  let:values
  let:editEnabled
  let:create
  let:doAction
  >
  
  <FormField path="name">
    <TextInput
      name="name"
      label="Name"
      placeholder="Tracker Component Name"
    />
  </FormField>

  <FormField path="linkedTrackerModelId">
    <SelectInput
      name="linkedTrackerModelId"
      label="Sub-Tracker"
      placeholder="Select a Tracker Model"
      let:selected
      on:focus={ refreshTrackerModels }
      >
      <option>-------</option>
      {#each trackerModels as trackerModel} 
          <option selected={selected === trackerModel.id} 
            value={trackerModel.id}>{trackerModel.name}
          </option>
      {/each}
    </SelectInput>
  </FormField>

  <FormField path="description">
    <TextInput
      name="description"
      label="Description"
      placeholder="Component description"
    />
  </FormField>
  
  <FormField path="perspectiveIdList">
    <Select
      name="perspectiveIdList"
      label="Relevant Perspectives"
      items={ perspectives.map(f => ({ value: f.id, label: f.name }) ) }
      isMulti={true}
    />
  </FormField>
  

</AbstractCRUDForm>

