import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { TinymceModule } from 'angular2-tinymce';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmailsService, GetEmailDataResolverService, GetEmailDataById } from './emails.service';
import { EmailsManageAddComponent } from './email-manage/email-add-component';
import { EmailsPageComponent } from './emails.component';
import { EmailsManageEditComponent } from './email-manage/email-edit-component';
import { EmailsPageRoutingModule } from './emails-routing.module';


@NgModule({
    declarations: [
        EmailsPageComponent,
        EmailsManageAddComponent,
        EmailsManageEditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        DataTablesModule,
        EmailsPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
        TagInputModule,
        TinymceModule,
        AngularEditorModule,
        NgbModule
    ],
    providers: [
        EmailsService,
        GetEmailDataResolverService,
        GetEmailDataById
    ]
})

export class EmailsPageModule { }
