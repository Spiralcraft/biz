import makeview from '@vfs/spiralcraft/data/genericCRUDView.js';

export default makeview(
    { apiEndpoint: "biz/trackerAlert/",
      postFields: 
        [ 
          "entityId",
          "noteId",
          "code",
        ]      
    }
  );