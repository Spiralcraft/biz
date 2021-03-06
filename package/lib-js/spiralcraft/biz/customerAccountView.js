import makeview from '@vfs/spiralcraft/data/genericCRUDView.js';

export default makeview(
    { apiEndpoint: "biz/customerAccount/",
      pkeyProp: "accountId",
      postFields: 
        [ 
          "displayName",
          "customerId",
          "contactId",
          "paymentMethodId",
          "paymentTermsId",
        ]      
    }
  );