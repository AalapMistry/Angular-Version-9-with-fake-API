import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorysPageComponent } from './categorys.component';

import { CategorysManageAddComponent } from './category-manage/category-add.component';
import { CategorysManageEditComponent } from './category-manage/category-edit.component';
import { GetCategoryDataResolverService, GetCategoryDataById } from './categorys.service';

const routes: Routes = [
    {
        path: '',
        component: CategorysPageComponent,
        resolve: {
            CategoryList: GetCategoryDataResolverService
        }
    },
    {
        path: 'category-add',
        component: CategorysManageAddComponent
    },
    {
        path: 'category-edit',
        component: CategorysManageEditComponent,
        resolve: {
            CategoryData: GetCategoryDataById
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategorysPageRoutingModule { }
