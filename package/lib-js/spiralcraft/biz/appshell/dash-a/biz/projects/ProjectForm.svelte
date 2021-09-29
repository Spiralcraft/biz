<script>
  import { getContext } from "svelte";
  import AbstractCRUDForm from "@vfs/app/components/AbstractCRUDForm.svelte";
  
  import {FormField, TextInput, CheckInput, SelectInput, Errors} from '@vfs/app/form/form.js';
  

  //  import createValidator from "./customerValidator";

  const app=getContext("app");
  const biz=getContext("biz");

  const initial = { id: "", name: "" };
  const title = "Info";
  const validator=undefined;
  const dataView=biz.projectView;
  const customerView=biz.customerView;

  
  const cleanEdited = (values) => values;
  
  export let create;
  export let embedded=false;
  
  let customers=[];
  
  const dataController = getContext("DataController");

  const props = 
  { initial,
    title,
    validator,
    dataView,
    create,
    embedded,
    cleanEdited,
  }
  
  const refreshCustomers = customerView.showAll( (data) => { customers=data } );

  
  const key = dataController.key;
  


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
      placeholder="Project Name"
    />
  </FormField>
  <FormField path="customerId">
    <SelectInput
      name="customerId"
      label="Customer"
      placeholder="Select a Customer"
      let:selected
      on:focus={ refreshCustomers }
      >
      <option>-------</option>
      {#each customers as customer} 
          <option selected={selected === customer.id} value={customer.id}>{customer.name}
          </option>
      {/each}
    </SelectInput>
  </FormField>

</AbstractCRUDForm>

