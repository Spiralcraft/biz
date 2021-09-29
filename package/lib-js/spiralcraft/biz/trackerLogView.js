import makeview from '@vfs/spiralcraft/data/genericCRUDView.js';

let app;
let view;

const titles=
{
  updateStatus: "Updated Status",
  logNote: "Logged Note",
  alert: "Raised Alert",
  unalert: "Removed Alert",
  init: "Initialized",
}

function eventTitle(code)
{ 
  let title=titles[code];
  if (!title)
  { title=code; 
  }
  return title;  
}

export default makeview(
{ 
  apiEndpoint: "biz/trackerLog/",
  postFields: 
    [ 
    ],
  makeAPI: (a,v) =>
    {
      app=a;
      view=v;
      return { 
        eventTitle,
      }
    }, 
});
