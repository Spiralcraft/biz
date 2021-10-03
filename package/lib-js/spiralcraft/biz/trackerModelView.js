import makeview from '@vfs/spiralcraft/data/genericCRUDView.js';

export default makeview(
  { apiEndpoint: "biz/trackerModel/",
    postFields: 
      ["name",
      ,"description"
      ,"order"
      ,"statusOrder"
      ]
  }
  );