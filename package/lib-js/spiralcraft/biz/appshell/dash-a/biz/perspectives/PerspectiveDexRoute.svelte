<script>
  import { getContext } from 'svelte';
  import AbstractDexRoute from '@vfs/app/components/AbstractDexRoute.svelte';
  
  const biz=getContext("biz");

  
  const columns =
  [
    {title:"Name",field:"name",width:"40%",minWidth:200,widthGrow: 1,widthShrink: 1,
      editor: "@input",
    },
  ]
  const dataView=biz.perspectiveView;
  
  const activityTitle = "Perspectives Admin";
  const panelTitle = "Perspectives";
  const hSplitMd = 3;
  const hSplitLg = 3;
  const hSplitXl = 3;
  const detailRoute=null;

  const props = 
  { 
    columns,
    dataView,
    detailRoute,
    activityTitle,
    panelTitle,
    hSplitMd,
    hSplitLg,
    hSplitXl,
    editInline: true,
    usesCallout: false,
  }
</script>


<AbstractDexRoute { ...props }>
</AbstractDexRoute>
