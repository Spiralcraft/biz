import AppSection from "@vfs/app/AppSection.js";
import bizSidebar from '@vfs/app/biz/BizSidebar.js';


const props={
  name: "main",
  sidebarMenus: [bizSidebar]
}
export default AppSection(props);