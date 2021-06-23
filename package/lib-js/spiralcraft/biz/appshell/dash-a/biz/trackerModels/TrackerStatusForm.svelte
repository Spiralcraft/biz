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

  import TrackerStatusWidget from '@vfs/app/biz/trackerModels/TrackerStatusWidget.svelte';
  //  import createValidator from "./customerValidator";

  const biz=getContext("biz");

  const title = "Tracker Status";
  const validator=undefined;
  const dataView=biz.trackerStatusView;
  const cleanEdited = (values) => values;
  
  export let create;
  export let embedded=false;
  
  export let trackerModelId;
  console.log("trackerModelId "+trackerModelId);
  const initial = { trackerModelId: trackerModelId, id: "", label: "", color:"#CCCCCC"};
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
</script>

<AbstractCRUDForm 
  {...props}
  let:errors
  let:values
  let:editEnabled
  let:create
  let:doAction
  >
  
  <FormField path="label">
    <TextInput
      name="label"
      label="Label Text"
      placeholder="Status Label"
    />
  </FormField>
  <FormField path="color">
    <InputGroup name="color" label="Tag Color">
      <TrackerStatusWidget classes="input-group-text" status={values}/>

      <TextInput
        name="color"
        type="color"
        classes="form-control-color"
        placeholder="Status Color"
        inputGroup="true"
        >
      </TextInput>
    </InputGroup>
  </FormField>
    
  <FormField path="description">
    <TextArea
      name="description"
      label="Description"
      placeholder="Description"
    />
  </FormField>

</AbstractCRUDForm>

