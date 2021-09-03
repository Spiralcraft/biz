import AppModule from '@vfs/app/AppModule.js';

import ProjectDexRoute from '@vfs/app/biz/projects/ProjectDexRoute.svelte';
import ProjectRoute from '@vfs/app/biz/projects/ProjectRoute.svelte';

import ContactDexRoute from '@vfs/app/biz/contacts/ContactDexRoute.svelte';
import ContactRoute from '@vfs/app/biz/contacts/ContactRoute.svelte';

import CustomerDexRoute from '@vfs/app/biz/customers/CustomerDexRoute.svelte';
import CustomerRoute from '@vfs/app/biz/customers/CustomerRoute.svelte';

import SalesOrderDexRoute from '@vfs/app/biz/salesOrders/SalesOrderDexRoute.svelte';
import SalesOrderRoute from '@vfs/app/biz/salesOrders/SalesOrderRoute.svelte';

import TrackerModelDexRoute from '@vfs/app/biz/trackerModels/TrackerModelDexRoute.svelte';
import TrackerModelRoute from '@vfs/app/biz/trackerModels/TrackerModelRoute.svelte';
import TrackerStatusRoute from '@vfs/app/biz/trackerModels/TrackerStatusRoute.svelte';
import TrackerModelComponentRoute from '@vfs/app/biz/trackerModels/TrackerModelComponentRoute.svelte';


import contactView from '@vfs/spiralcraft/biz/contactView.js';
import contactNoteView from '@vfs/spiralcraft/biz/contactNoteView.js';
import contactTaggedView from '@vfs/spiralcraft/biz/contactTaggedView.js';
import contactTagView from '@vfs/spiralcraft/biz/contactTagView.js';
import customerView from '@vfs/spiralcraft/biz/customerView.js';
import customerAccountView from '@vfs/spiralcraft/biz/customerAccountView.js';
import customerProjectView from '@vfs/spiralcraft/biz/customerProjectView.js';
import salesOrderView from '@vfs/spiralcraft/biz/salesOrderView.js';
import projectView from '@vfs/spiralcraft/biz/projectView.js';
import trackerModelView from '@vfs/spiralcraft/biz/trackerModelView.js';
import trackerStatusView from '@vfs/spiralcraft/biz/trackerStatusView.js';
import trackerModelComponentView from '@vfs/spiralcraft/biz/trackerModelComponentView.js';
import trackerView from '@vfs/spiralcraft/biz/trackerView.js';
import trackerComponentView from '@vfs/spiralcraft/biz/trackerComponentView.js';

import custom from '@vfs/app/spiralcraft-biz.custom.js';

let app;
const context =
{
  custom,
};

const onInit = (ac) => 
{ 
  app=ac; 
}

const views=
{
  contactView,
  contactNoteView,
  contactTaggedView,
  contactTagView,
  customerView,
  customerAccountView,
  customerProjectView,
  salesOrderView,
  projectView,
  trackerModelView,
  trackerStatusView,
  trackerView,
  trackerComponentView,
  trackerModelComponentView,
};

export default AppModule(
  {
    name: "biz",
    routes: 
    [
      {
        path: "/projects"
        ,component: ProjectDexRoute
        ,authRequired: true
        ,restricted: false
        ,section: "main"
        ,icon: custom.pm.project.icon
      },
      {
        path: "/projects/:id"
        ,component: ProjectRoute
        ,authRequired: true
        ,restricted: false
        ,section: "main"
        ,icon: custom.pm.project.icon
      },
      {
        path: "/customers"
        ,component: CustomerDexRoute
        ,authRequired: true
        ,restricted: false
        ,section: "main"
        ,icon: "people"
      },
      {
        path: "/customers/:id"
        ,component: CustomerRoute
        ,authRequired: true
        ,restricted: false
        ,section: "main"
        ,icon: "people"
      },
      {
        path: "/salesOrders"
        ,component: SalesOrderDexRoute
        ,authRequired: true
        ,restricted: false
        ,section: "main"
        ,icon: "cart3"
      },
      {
        path: "/salesOrders/:id"
        ,component: SalesOrderRoute
        ,authRequired: true
        ,restricted: false
        ,section: "main"
        ,icon: "cart3"
      },
      {
        path: "/trackerModels"
        ,component: TrackerModelDexRoute
        ,authRequired: true
        ,restricted: true
        ,section: "main"
        ,icon: "workflow"
      },
      {
        path: "/trackerModels/:id"
        ,component: TrackerModelRoute
        ,authRequired: true
        ,restricted: true
        ,section: "main"
        ,icon: "workflow"
      },
      {
        path: "/trackerModels/:trackerModelId/status/:id"
        ,component: TrackerStatusRoute
        ,authRequired: true
        ,restricted: true
        ,section: "main"
        ,icon: "workflow"
      },
      {
        path: "/trackerModels/:trackerModelId/component/:id"
        ,component: TrackerModelComponentRoute
        ,authRequired: true
        ,restricted: true
        ,section: "main"
        ,icon: "workflow"
      },
      {
        path: "/contacts"
        ,component: ContactDexRoute
        ,authRequired: true
        ,restricted: true
        ,section: "main"
        ,icon: "contacts"
      },
      {
        path: "/contacts/:id"
        ,component: ContactRoute
        ,authRequired: true
        ,restricted: true
        ,section: "main"
        ,icon: "contacts"
      },
    ],
    icons: { 
      
    },
    views,
    context,
    onInit,

  }
)