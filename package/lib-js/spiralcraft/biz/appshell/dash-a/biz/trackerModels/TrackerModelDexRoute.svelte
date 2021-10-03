<script>
  import { getContext } from 'svelte';
  import AbstractDexRoute from '@vfs/app/components/AbstractDexRoute.svelte';
  import TrackerModelDetailPanel from '@vfs/app/biz/trackerModels/TrackerModelDetailPanel.svelte';
  
  const biz=getContext("biz");

  
  const columns =
  [
    {title:"Name",field:"name",width:"40%",minWidth:200,widthGrow: 1,widthShrink: 1},
  ]
  const dataView=biz.trackerModelView;
  
  const detailRoute="/trackerModels";
  const activityTitle = "Tracker Admin";
  const panelTitle = "Tracker Models";
  const hSplitMd = 3;
  const hSplitLg = 3;
  const hSplitXl = 3;

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
  }
</script>


<AbstractDexRoute { ...props }>
  <TrackerModelDetailPanel slot="detail-callout"
    create={false}
    embedded={true}
  />
</AbstractDexRoute>
