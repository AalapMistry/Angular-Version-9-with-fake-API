import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        loadChildren: () => import('./dash-default/dash-default.module').then(module => module.DashDefaultModule)
      },
      {
        path: 'sale',
        loadChildren: () => import('./dash-sale/dash-sale.module').then(module => module.DashSaleModule)
      },
      {
        path: 'crm',
        loadChildren: () => import('./dash-crm/dash-crm.module').then(module => module.DashCrmModule)
      },
      {
        path: 'analytics',
        loadChildren: () => import('./dash-analytics/dash-analytics.module').then(module => module.DashAnalyticsModule)
      },
      {
        path: 'project',
        loadChildren: () => import('./dash-project/dash-project.module').then(module => module.DashProjectModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
