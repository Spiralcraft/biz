import AppModule from '@vfs/app/AppModule.js'

import ProjectDexRoute from '@vfs/app/biz/projects/ProjectDexRoute.svelte'
import ProjectRoute from '@vfs/app/biz/projects/ProjectRoute.svelte'

import CustomerDexRoute from '@vfs/app/biz/customers/CustomerDexRoute.svelte'
import CustomerRoute from '@vfs/app/biz/customers/CustomerRoute.svelte'

import TrackerModelDexRoute from '@vfs/app/biz/trackerModels/TrackerModelDexRoute.svelte'
import TrackerModelRoute from '@vfs/app/biz/trackerModels/TrackerModelRoute.svelte'
import TrackerStatusRoute from '@vfs/app/biz/trackerModels/TrackerStatusRoute.svelte'


import customerView from '@vfs/spiralcraft/biz/customerView.js';
import projectView from '@vfs/spiralcraft/biz/projectView.js';
import trackerModelView from '@vfs/spiralcraft/biz/trackerModelView.js';
import trackerStatusView from '@vfs/spiralcraft/biz/trackerStatusView.js';
import trackerView from '@vfs/spiralcraft/biz/trackerView.js';

let app;
const context =
{
};

const onInit = (ac) => 
{ 
  app=ac; 
  context.customerView=customerView(app); 
  context.customerView.init();
  context.projectView=projectView(app); 
  context.projectView.init();
  context.trackerModelView=trackerModelView(app); 
  context.trackerModelView.init();
  context.trackerStatusView=trackerStatusView(app); 
  context.trackerStatusView.init();
  context.trackerView=trackerView(app); 
  context.trackerView.init();
}

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
        ,icon: "circleSquare"
      },
      {
        path: "/projects/:id"
        ,component: ProjectRoute
        ,authRequired: true
        ,restricted: false
        ,section: "main"
        ,icon: "circleSquare"
      },
/*
      {
        path: "/production"
        ,component: ProductionDash
        ,authRequired: true
        ,restricted: false
        ,section: "main"
        ,icon: "factory"
      },
*/
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
    ],
    icons: { 
      
    },
    context,
    onInit,

  }
)