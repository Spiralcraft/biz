import makeview from '@vfs/spiralcraft/data/genericCRUDView.js';

export default makeview(
    { apiEndpoint: "biz/contactTagged/",
      postFields: 
        [ 
          "entityId",
          "tagId",
        ]      
    }
  );