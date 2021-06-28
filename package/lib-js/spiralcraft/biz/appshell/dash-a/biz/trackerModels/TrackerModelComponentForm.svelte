<script>
  import { getContext } from "svelte";
  import AbstractCRUDForm from "@vfs/app/components/AbstractCRUDForm.svelte";
  
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
  
  export let create;
  export let embedded=false;
  
  export let trackerModelId;
  console.log("trackerModelId "+trackerModelId);
  const initial = { trackerModelId: trackerModelId, id: "", name: "", linkedTrackerModelId:""};
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
    defaultEditEnabled
  }
  
  const key = dataController.key;
  
  let reset;

  let trackerModels=[];
  const trackerModelView=biz.trackerModelView;
  const refreshTrackerModels 
    = trackerModelView.showAll( (data) => { trackerModels=data } );

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

</AbstractCRUDForm>

