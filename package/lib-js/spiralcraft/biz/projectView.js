import makeview from '@vfs/spiralcraft/data/genericCRUDView.js';

export default makeview(
  { apiEndpoint: "biz/project/",
    postFields: 
      ["name",
      "customerId",
      ]
  }
  );