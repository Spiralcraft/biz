<script>
  import { getContext } from "svelte";
  import AbstractCRUDForm from "@vfs/app/components/AbstractCRUDForm.svelte";

  import {FormField, TextInput, CheckInput, Errors} from '@vfs/app/form/form.js';
    
  //  import createValidator from "./customerValidator";
 
  const biz=getContext("biz");

  const initial = { id: "", name: "" };
  const title = "Customer";
  const validator=undefined;
  const dataView=biz.customerView;
  const cleanEdited = (values) => values;
  
  export let create;
  export let embedded=false;
  
  const props = 
  { initial,
    title,
    validator,
    dataView,
    create,
    embedded,
    cleanEdited,
  }
</script>

<AbstractCRUDForm 
  {...props}
  let:errors
  let:editEnabled
  let:create
  >
  
  <FormField path="name">
    <TextInput
      type="text"
      name="name"
      label="Name"
      placeholder="Customer Name"
    />
  </FormField>

</AbstractCRUDForm>