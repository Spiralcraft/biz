<script>
  import { getContext } from "svelte";
  import AbstractCRUDForm from "@vfs/app/components/AbstractCRUDForm.svelte";

  import {FormField, TextInput, CheckInput, Errors} from '@vfs/app/form/form.js';
    
  //  import createValidator from "./customerValidator";
 
  const biz=getContext("biz");

  const initial = 
    { id: "", 
      knownAs: "", 
      attentionName: "", 
      organizationName: "", 
      postalAddress:
      { 
        streetAddress: "",
        locator: "",
        locality: "",
        region: "",
        postalCode: "",
      },
      email: "",
      phone: "", 
    };
  export let title = "Contact Info";
  const titleClasses = "fw-500 fs-6";
  export let bodyClasses;
  
  const validator=undefined;
  const dataView=biz.contactView;
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
    titleClasses,
    bodyClasses,
  }
</script>

<AbstractCRUDForm 
  {...props}
  let:errors
  let:editEnabled
  let:create
  >
  <div class="h-100 overflow-auto d-flex flex-column">
    <FormField path="knownAs">
      <TextInput
        type="text"
        name="knownAs"
        label="Familiar Name"
        placeholder="Familiar Name"
      />
    </FormField>
    <FormField path="attentionName">
      <TextInput
        type="text"
        name="attentionName"
        label="Full Name"
        placeholder="Full Name"
      />
    </FormField>
    <FormField path="organizationName">
      <TextInput
        type="text"
        name="organizationName"
        label="Organization Name"
        placeholder="Organization Name"
      />
    </FormField>
    <FormField path="email">
      <TextInput
        type="text"
        name="email"
        label="Email"
        placeholder="Email"
      />
    </FormField>
    <FormField path="phone">
      <TextInput
        type="text"
        name="phone"
        label="Phone"
        placeholder="Phone"
      />
    </FormField>
    <FormField path="postalAddress.streetAddress">
      <TextInput
        type="text"
        name="postalAddress.streetAddress"
        label="Street Address"
        placeholder="Street Address"
      />
    </FormField>
    <FormField path="postalAddress.locator">
      <TextInput
        type="text"
        name="postalAddress.locator"
        label="Unit/Locator"
        placeholder="Suite, PMB, Apt, etc"
      />
    </FormField>
    <FormField path="postalAddress.locality">
      <TextInput
        type="text"
        name="postalAddress.locality"
        label="City"
        placeholder="City"
      />
    </FormField>
    <FormField path="postalAddress.region">
      <TextInput
        type="text"
        name="postalAddress.region"
        label="State"
        placeholder="State"
      />
    </FormField>
    <FormField path="postalAddress.postalCode">
      <TextInput
        type="text"
        name="postalAddress.postalCode"
        label="Zip Code"
        placeholder="Zip Code"
      />
    </FormField>
  </div>
</AbstractCRUDForm>