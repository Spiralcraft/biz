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
  export let titleClasses;
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
      name="knownAs"
      label="Familiar Name"
      placeholder="Familiar Name"
    />
    <TextInput
      type="text"
      name="attentionName"
      label="Full Name"
      placeholder="Full Name"
    />
    <TextInput
      type="text"
      name="organizationName"
      label="Organization Name"
      placeholder="Organization Name"
    />
    <TextInput
      type="text"
      name="email"
      label="Email"
      placeholder="Email"
    />
    <TextInput
      type="text"
      name="phone"
      label="Phone"
      placeholder="Phone"
    />
    <TextInput
      type="text"
      name="postalAddress.streetAddress"
      label="Street Address"
      placeholder="Street Address"
    />
    <TextInput
      type="text"
      name="postalAddress.locator"
      label="Unit/Locator"
      placeholder="Suite, PMB, Apt, etc"
    />
    <TextInput
      type="text"
      name="postalAddress.locality"
      label="City"
      placeholder="City"
    />
    <TextInput
      type="text"
      name="postalAddress.region"
      label="State"
      placeholder="State"
    />
    <TextInput
      type="text"
      name="postalAddress.postalCode"
      label="Zip Code"
      placeholder="Zip Code"
    />
  </FormField>

</AbstractCRUDForm>