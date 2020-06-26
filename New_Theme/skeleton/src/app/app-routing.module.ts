import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/signin',
        pathMatch: 'full'
      },

      {
        path: 'auth',
        loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule)
      },
      {
        path: 'user-list',
        loadChildren: () => import('./users/users.module').then(module => module.UsersPageModule)
      },
      {
        path: 'product-list',
        loadChildren: () => import('./product/products.module').then(module => module.ProductsPageModule)
      },
      {
        path: 'email-list',
        loadChildren: () => import('./email/emails.module').then(module => module.EmailsPageModule)
      },
      {
        path: 'category-list',
        loadChildren: () => import('./category/categorys.module').then(module => module.CategorysPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
