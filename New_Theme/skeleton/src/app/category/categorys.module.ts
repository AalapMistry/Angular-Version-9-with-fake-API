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

import { CategorysManageAddComponent } from './category-manage/category-add.component';
import { CategorysPageComponent } from './categorys.component';
import { CategorysManageEditComponent } from './category-manage/category-edit.component';
import { CategorysService, GetCategoryDataResolverService, GetCategoryDataById } from './categorys.service';
import { CategorysPageRoutingModule } from './categorys-routing.module';

@NgModule({
    declarations: [
        CategorysPageComponent,
        CategorysManageAddComponent,
        CategorysManageEditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        DataTablesModule,
        CategorysPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
        TagInputModule,
        TinymceModule,
        AngularEditorModule,
        NgbModule
    ],
    providers: [
        CategorysService,
        GetCategoryDataResolverService,
        GetCategoryDataById,
    ]
})

export class CategorysPageModule { }
