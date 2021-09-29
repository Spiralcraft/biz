import makeview from '@vfs/spiralcraft/data/genericCRUDView.js';

export default makeview(
    { apiEndpoint: "biz/trackerNote/",
      postFields: 
        [ 
          "entityId",
          "sourceType",
          "sourceText",
          "alertId",
        ]      
    }
  );