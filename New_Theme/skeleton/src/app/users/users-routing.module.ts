import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersPageComponent } from './users.component';
import { GetUserDataResolverService, GetUserDataById } from './users.service';
import { UsersManageAddComponent } from './user-manage/user-add.component';
import { UsersManageEditComponent } from './user-manage/user-edit.component';
import { UsersProfileComponent } from './user-profile-details/user-profile.component';


const routes: Routes = [
    {
        path: '',
        component: UsersPageComponent,
        resolve: {
            userList: GetUserDataResolverService
        }
    },
    {
        path: 'user-add',
        component: UsersManageAddComponent
    },
    {
        path: 'user-edit',
        component: UsersManageEditComponent,
        resolve: {
            userData: GetUserDataById
        }
    },
    {
        path: 'user-profile',
        component: UsersProfileComponent,
        resolve: {
            userData: GetUserDataById
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersPageRoutingModule { }
