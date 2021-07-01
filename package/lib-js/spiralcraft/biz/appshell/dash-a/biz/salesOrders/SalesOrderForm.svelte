<script>
  import { getContext } from "svelte";
  import AbstractCRUDForm from "@vfs/app/components/AbstractCRUDForm.svelte";

  import {FormField, TextInput, CheckInput, Errors} from '@vfs/app/form/form.js';
    
  //  import createValidator from "./customerValidator";
 
  const biz=getContext("biz");

  const initial = { id: "", name: "" };
  const title = "Sales Order";
  const validator=undefined;
  const dataView=biz.salesOrderView;
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
  

</AbstractCRUDForm>