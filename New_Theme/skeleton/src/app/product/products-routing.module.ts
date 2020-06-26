import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsPageComponent } from './products.component';

import { ProductsManageAddComponent } from './product-manage/product-add.component';
import { ProductsManageEditComponent } from './product-manage/product-edit-component';
import { GetProductDataResolverService, GetProductDataById } from './products.service';

const routes: Routes = [
    {
        path: '',
        component: ProductsPageComponent,
        resolve: {
            ProductList: GetProductDataResolverService
        }
    },
    {
        path: 'product-add',
        component: ProductsManageAddComponent
    },
    {
        path: 'product-edit',
        component: ProductsManageEditComponent,
        resolve: {
            ProductData: GetProductDataById
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsPageRoutingModule { }
