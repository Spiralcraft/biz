<script>
  import { getContext } from "svelte";
  import AbstractCRUDForm from "@vfs/app/components/AbstractCRUDForm.svelte";
  
  import {FormField, TextInput, TextArea, CheckInput, SelectInput, Errors} from '@vfs/app/form/form.js';
  
  import TrackerStatusSetTable from '@vfs/app/biz/trackerModels/TrackerStatusSetTable.svelte';
  import TrackerModelComponentTable from '@vfs/app/biz/trackerModels/TrackerModelComponentTable.svelte';
    
  //  import createValidator from "./customerValidator";

  const biz=getContext("biz");

  const initial = { id: "", name: "" };
  const title = "Tracker Model";
  const titleClasses = "fw-500 fs-6";
  const validator=undefined;
  const dataView=biz.trackerModelView;
  const cleanEdited = (values) => values;
  
  export let create;
  export let embedded=false;
  
  
  const dataController = getContext("DataController");

  const props = 
  { initial,
    title,
    titleClasses,
    validator,
    dataView,
    create,
    embedded,
    cleanEdited,
  }
  
  const key = dataController.key;

</script>

<AbstractCRUDForm 
  {...props}
  let:errors
  let:values
  let:editEnabled
  let:create
  >
  
  <FormField path="name">
    <TextInput
      name="name"
      label="Name"
      placeholder="Tracker Model Name"
    />
  </FormField>
  
  <FormField path="description">
    <TextArea
      name="description"
      label="Description"
      placeholder="Describe this tracker"
    />
  </FormField>

</AbstractCRUDForm>

