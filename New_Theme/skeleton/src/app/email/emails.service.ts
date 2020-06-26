import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmailModel } from "./email.class";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpHeaders } from "@angular/common/http";
import { CoreHttpService } from '../core/core-http.service';
import { AppConstant } from '../app.constant';


@Injectable()
export class EmailsService {
    LOCALAPIURL: string = AppConstant.getEmailUrl();
    constructor(private coreHttpService: CoreHttpService) {
    }
    getEmailDataList(): Observable<Array<EmailModel>> {
        return this.coreHttpService.httpGetRequest<any>(this.LOCALAPIURL);
    }
    deleteRecord(id) {
        return this.coreHttpService.httpDeleteRequest(this.LOCALAPIURL + '/' + id);
    }
    updateRecord(record: EmailModel) {
        return this.coreHttpService.httpPutRequest<EmailModel, any>(this.LOCALAPIURL + '/' + record.id, record);
    }
    insert(data: EmailModel) {
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.coreHttpService.httpPostRequest<any, EmailModel>(this.LOCALAPIURL,
            JSON.stringify(data), header);
    }
    getById(id: number) {
        return this.coreHttpService.httpGetRequest(this.LOCALAPIURL + '?id=' + id);
    }
}

@Injectable()
export class GetEmailDataResolverService implements Resolve<any> {
    constructor(private _EmailsService: EmailsService) { }
    resolve(route: ActivatedRouteSnapshot): any {
        return this._EmailsService.getEmailDataList();
    }
}


@Injectable()
export class GetEmailDataById implements Resolve<any> {
    constructor(private _EmailsService: EmailsService) { }
    resolve(route: ActivatedRouteSnapshot): any {
        return this._EmailsService.getById(Number(route.paramMap.get('id')));
    }
}
