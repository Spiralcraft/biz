<script>
  import { getContext } from 'svelte';
  import AbstractDexRoute from '@vfs/app/components/AbstractDexRoute.svelte';
  import TrackerModelForm from '@vfs/app/biz/trackerModels/TrackerModelForm.svelte';
  
  const biz=getContext("biz");

  
  const columns =
  [
    {title:"Name",field:"name",width:"40%",minWidth:200,widthGrow: 1,widthShrink: 1},
  ]
  const dataView=biz.trackerModelView;
  
  const detailRoute="/trackerModels";
  const activityTitle = "Tracker Admin";
  const panelTitle = "Tracker Models";
  const hSplit = 3;

  const props = 
  { 
    columns,
    dataView,
    detailRoute,
    activityTitle,
    panelTitle,
    hSplit,
  }
</script>


<AbstractDexRoute { ...props }>
  <TrackerModelForm slot="detail-callout"
    create={false}
    embedded={true}
  />
</AbstractDexRoute>
