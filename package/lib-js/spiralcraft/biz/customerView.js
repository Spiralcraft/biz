import makeview from '@vfs/spiralcraft/data/genericCRUDView.js';

export default makeview(
    { apiEndpoint: "biz/customer/", 
      postFields: 
        [ 
          "name",
        ]      
    }
  );