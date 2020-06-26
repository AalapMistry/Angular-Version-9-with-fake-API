import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductModel } from "./Product.class";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpHeaders } from "@angular/common/http";
import { CoreHttpService } from '../core/core-http.service';
import { AppConstant } from '../app.constant';


@Injectable()
export class ProductsService {
    LOCALAPIURL: string = AppConstant.getProductUrl();
    constructor(private coreHttpService: CoreHttpService) {
    }
    getProductDataList(): Observable<Array<ProductModel>> {
        return this.coreHttpService.httpGetRequest<any>(this.LOCALAPIURL);
    }
    deleteRecord(id) {
        return this.coreHttpService.httpDeleteRequest(this.LOCALAPIURL + '/' + id);
    }
    updateRecord(record: ProductModel) {
        return this.coreHttpService.httpPutRequest<ProductModel, any>(this.LOCALAPIURL + '/' + record.id, record);
    }
    insert(data: ProductModel) {
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.coreHttpService.httpPostRequest<any, ProductModel>(this.LOCALAPIURL,
            JSON.stringify(data), header);
    }
    getById(id: number) {
        return this.coreHttpService.httpGetRequest(this.LOCALAPIURL + '?id=' + id);
    }

    
}

@Injectable()
export class GetProductDataResolverService implements Resolve<any> {
    constructor(private _ProductsService: ProductsService) { }
    resolve(route: ActivatedRouteSnapshot): any {
        return this._ProductsService.getProductDataList();
    }
}

@Injectable()
export class GetProductDataById implements Resolve<any> {
    constructor(private _ProductsService: ProductsService) { }
    resolve(route: ActivatedRouteSnapshot): any {
        return this._ProductsService.getById(Number(route.paramMap.get('id')));
    }
}


