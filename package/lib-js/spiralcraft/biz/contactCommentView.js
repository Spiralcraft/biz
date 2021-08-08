import makeview from '@vfs/spiralcraft/data/genericCRUDView.js';

export default makeview(
    { apiEndpoint: "biz/contactComment/",
      postFields: 
        [ 
          "entityId",
          "sourceType",
          "sourceText",
        ]      
    }
  );