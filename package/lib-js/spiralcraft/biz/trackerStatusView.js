import makeview from '@vfs/spiralcraft/data/genericCRUDView.js';

export default makeview(
  { apiEndpoint: "biz/trackerStatus/",
    postFields: 
      ["trackerModelId",
       "label",
       "color",
       "description",
      ]
  }
  );