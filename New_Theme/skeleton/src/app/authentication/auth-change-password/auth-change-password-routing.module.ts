import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthChangePasswordComponent } from './auth-change-password.component';
import { GetUserById } from '../authntication.service';

const routes: Routes = [
  {
    path: '',
    component: AuthChangePasswordComponent,
    resolve: {
      userData: GetUserById
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthChangePasswordRoutingModule { }
