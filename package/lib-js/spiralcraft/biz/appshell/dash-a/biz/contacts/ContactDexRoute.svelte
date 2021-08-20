<script>
  import { getContext } from 'svelte';
  import AbstractDexRoute from "@vfs/app/components/AbstractDexRoute.svelte";
  import SearchControlStrip from "@vfs/app/components/SearchControlStrip.svelte";
  import ContactDetailPanel from "@vfs/app/biz/contacts/ContactDetailPanel.svelte";
  const app=getContext("App");
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
  let data;
  
  $: console.log("Data changed "+JSON.stringify(data));
  
  const props = 
  { 
    columns,
    dataView,
    detailRoute,
    activityTitle,
    panelTitle,
  }
  
  function searchRequested(query)
  { 
    dataView.call
      (null
      ,"search?q="+encodeURIComponent(query)
      ,null
      ,(apiData) => { data = apiData.result.map( r => r.item) }
      );
  }
  
  function searchCleared()
  {
    dataView.showAll((apiData) => { data = apiData });
  }
</script>


<AbstractDexRoute { ...props } {data}>
  <SearchControlStrip slot="search-controls" {searchRequested} {searchCleared}/>
  
  <ContactDetailPanel slot="detail-callout"
    create={false}
    embedded={true}
  />
</AbstractDexRoute>

