import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryModel } from "./category.class";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpHeaders } from "@angular/common/http";
import { CoreHttpService } from '../core/core-http.service';
import { AppConstant } from '../app.constant';


@Injectable()
export class CategorysService {
    LOCALAPIURL: string = AppConstant.getCategoryUrl();
    constructor(private coreHttpService: CoreHttpService) {
    }
    getCategoryDataList(): Observable<Array<CategoryModel>> {
        return this.coreHttpService.httpGetRequest<any>(this.LOCALAPIURL);
    }
    deleteCategoryRecord(id) {
        return this.coreHttpService.httpDeleteRequest(this.LOCALAPIURL + '/' + id);
    }
    updateCategoryRecord(record: CategoryModel) {
        return this.coreHttpService.httpPutRequest<CategoryModel, any>(this.LOCALAPIURL + '/' + record.id, record);
    }
    insertCategoryRecord(data: CategoryModel) {
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.coreHttpService.httpPostRequest<any, CategoryModel>(this.LOCALAPIURL,
            JSON.stringify(data), header);
    }
    getCategoryById(id: number) {
        return this.coreHttpService.httpGetRequest(this.LOCALAPIURL + '?id=' + id);
    }
	
    
}

@Injectable()
export class GetCategoryDataResolverService implements Resolve<any> {
    constructor(private _CategorysService: CategorysService) { }
    resolve(route: ActivatedRouteSnapshot): any {
        return this._CategorysService.getCategoryDataList();
    }
}


@Injectable()
export class GetCategoryDataById implements Resolve<any> {
    constructor(private _CategorysService: CategorysService) { }
    resolve(route: ActivatedRouteSnapshot): any {
        return this._CategorysService.getCategoryById(Number(route.paramMap.get('id')));
    }
}

