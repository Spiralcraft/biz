import AppModule from '@vfs/app/AppModule.js'

import ProjectDexRoute from '@vfs/app/biz/projects/ProjectDexRoute.svelte'
import ProjectRoute from '@vfs/app/biz/projects/ProjectRoute.svelte'

import CustomerDexRoute from '@vfs/app/biz/customers/CustomerDexRoute.svelte'
import CustomerRoute from '@vfs/app/biz/customers/CustomerRoute.svelte'

import TrackerModelDexRoute from '@vfs/app/biz/trackerModels/TrackerModelDexRoute.svelte'
import TrackerModelRoute from '@vfs/app/biz/trackerModels/TrackerModelRoute.svelte'
import TrackerStatusRoute from '@vfs/app/biz/trackerModels/TrackerStatusRoute.svelte'
import TrackerModelComponentRoute from '@vfs/app/biz/trackerModels/TrackerModelComponentRoute.svelte'


import customerView from '@vfs/spiralcraft/biz/customerView.js';
import projectView from '@vfs/spiralcraft/biz/projectView.js';
import trackerModelView from '@vfs/spiralcraft/biz/trackerModelView.js';
import trackerStatusView from '@vfs/spiralcraft/biz/trackerStatusView.js';
import trackerModelComponentView from '@vfs/spiralcraft/biz/trackerModelComponentView.js';
import trackerView from '@vfs/spiralcraft/biz/trackerView.js';

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
  customerView,
  projectView,
  trackerModelView,
  trackerStatusView,
  trackerView,
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
      {
        path: "/trackerModels/:trackerModelId/component/:id"
        ,component: TrackerModelComponentRoute
        ,authRequired: true
        ,restricted: true
        ,section: "main"
        ,icon: "workflow"
      },
    ],
    icons: { 
      
    },
    views,
    context,
    onInit,

  }
)