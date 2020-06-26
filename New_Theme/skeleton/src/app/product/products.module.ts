import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageRoutingModule } from './products-routing.module'
import { SharedModule } from '../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { TinymceModule } from 'angular2-tinymce';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsManageAddComponent } from './product-manage/product-add.component';
import { ProductsPageComponent } from './products.component';
import { ProductsManageEditComponent } from './product-manage/product-edit-component';
import { ProductsService, GetProductDataResolverService, GetProductDataById } from './products.service';

@NgModule({
    declarations: [
        ProductsPageComponent,
        ProductsManageAddComponent,
        ProductsManageEditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        DataTablesModule,
        ProductsPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
        TagInputModule,
        TinymceModule,
        AngularEditorModule,
        NgbModule
    ],
    providers: [
        ProductsService,
        GetProductDataResolverService,
        GetProductDataById,
    ]
})

export class ProductsPageModule { }
