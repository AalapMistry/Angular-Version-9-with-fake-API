import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageRoutingModule } from './users-routing.module';

import { UsersPageComponent } from './users.component';
import { SharedModule } from '../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { UserService, GetUserDataResolverService, GetUserDataById } from './users.service';
import { UsersManageAddComponent } from './user-manage/user-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { TinymceModule } from 'angular2-tinymce';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CoreFormValidationService } from '../core/core-form-validation.service';
import { UsersManageEditComponent } from './user-manage/user-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersProfileComponent } from './user-profile-details/user-profile.component';

@NgModule({
    declarations: [
        UsersPageComponent,
        UsersManageAddComponent,
        UsersManageEditComponent,
        UsersProfileComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        DataTablesModule,
        UsersPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
        TagInputModule,
        TinymceModule,
        AngularEditorModule,
        NgbModule
    ],
    providers: [
        UserService,
        GetUserDataResolverService,
        GetUserDataById
    ]
})

export class UsersPageModule { }
