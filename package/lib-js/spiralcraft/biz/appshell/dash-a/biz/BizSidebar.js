import SidebarMenu from "@vfs/app/models/SidebarMenu.js";
import SidebarMenuItem  from "@vfs/app/models/SidebarMenuItem.js";

const bizSidebar=SidebarMenu(
  { items: 
     [ 
       SidebarMenuItem({ text:"Projects", path:"/projects"}),
       SidebarMenuItem({ text:"Customers", path:"/customers"}),
//       SidebarMenuItem({ text:"Production", path:"/production"}),
       SidebarMenuItem({ text:"Tracker Admin", path:"/trackerModels"}),
     ] 
  }
);

export default bizSidebar;