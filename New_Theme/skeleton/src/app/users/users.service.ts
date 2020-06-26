import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "./user.class";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpHeaders } from "@angular/common/http";
import { CoreHttpService } from '../core/core-http.service';
import { AppConstant } from '../app.constant';

@Injectable()
export class UserService {
    USERLOCALAPIURL: string = AppConstant.getUrl() + "/users";
    USERGALLERYURL: string = AppConstant.getUrl() + "/usergallery";
    constructor(private coreHttpService: CoreHttpService) {
    }
    getUserDataList(): Observable<Array<UserModel>> {
        return this.coreHttpService.httpGetRequest<any>(this.USERLOCALAPIURL);
    }
    deleteRecord(id) {
        return this.coreHttpService.httpDeleteRequest(this.USERLOCALAPIURL + '/' + id);
    }
    updateRecord(record: UserModel) {
        return this.coreHttpService.httpPutRequest<UserModel, any>(this.USERLOCALAPIURL + '/' + record.id, record);
    }
    insert(data: UserModel) {
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.coreHttpService.httpPostRequest<any, UserModel>(this.USERLOCALAPIURL,
            JSON.stringify(data), header);
    }
    getById(id: number) {
        return this.coreHttpService.httpGetRequest(this.USERLOCALAPIURL + '?id=' + id);
    }
    getByEmailAndPassword(email:string,password:string){
        return this.coreHttpService.httpGetRequest(this.USERLOCALAPIURL + '?email='+email +'&password='+password);
    }


    insertUserGalleryData(data) {
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.coreHttpService.httpPostRequest<any, UserModel>(this.USERGALLERYURL,
            JSON.stringify(data), header);
    }
    getUserGalleryDataByUserAndGType(userId, gallerytype) {
        return this.coreHttpService.httpGetRequest<any>(this.USERGALLERYURL + "?userId=" + userId + "&galleryType=" + gallerytype);
    }
    deleteGalleryData(id) {
        return this.coreHttpService.httpDeleteRequest(this.USERGALLERYURL + '/' + id);
    }

}

@Injectable()
export class GetUserDataResolverService implements Resolve<any> {
    constructor(private _userService: UserService) { }
    resolve(route: ActivatedRouteSnapshot): any {
        return this._userService.getUserDataList();
    }
}


@Injectable()
export class GetUserDataById implements Resolve<any> {
    constructor(private _userService: UserService) { }
    resolve(route: ActivatedRouteSnapshot): any {
        return this._userService.getById(Number(route.paramMap.get('id')));
    }
}
