import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailsPageComponent } from './emails.component';
import { GetEmailDataResolverService, GetEmailDataById } from './emails.service';
import { EmailsManageAddComponent } from './email-manage/email-add-component';
import { EmailsManageEditComponent } from './email-manage/email-edit-component';

const routes: Routes = [
    {
        path: '',
        component: EmailsPageComponent,
        resolve: {
            EmailList: GetEmailDataResolverService
        }
    },
    {
        path: 'email-add',
            component: EmailsManageAddComponent
    },
    {
        path: 'email-edit',
        component: EmailsManageEditComponent,
        resolve: {
            EmailData: GetEmailDataById
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmailsPageRoutingModule { }
