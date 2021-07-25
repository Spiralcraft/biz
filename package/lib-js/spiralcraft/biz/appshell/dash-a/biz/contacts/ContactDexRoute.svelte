<script>
  import { getContext } from 'svelte';
  import AbstractDexRoute from "@vfs/app/components/AbstractDexRoute.svelte";
  import ContactDetailPanel from "@vfs/app/biz/contacts/ContactDetailPanel.svelte";
  
  const biz=getContext("biz");
  const columns =
  [
    {title:"Name",field:"knownAs"},
    {title:"Organization",field:"organizationName"},
    {title:"Email",field:"email"},
    {title:"Phone",field:"phone"},
  ];
  const dataView=biz.contactView;
  
  const detailRoute="/contacts";
  const activityTitle = "Contact List";
  const panelTitle = "Contacts";

  const props = 
  { 
    columns,
    dataView,
    detailRoute,
    activityTitle,
    panelTitle,
  }
</script>


<AbstractDexRoute { ...props }>
  <ContactDetailPanel slot="detail-callout"
    create={false}
    embedded={true}
  />
</AbstractDexRoute>
