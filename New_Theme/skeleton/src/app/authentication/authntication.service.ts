import { Injectable } from '@angular/core';
import { CoreHttpService } from '../core/core-http.service';
import { AppConstant } from '../app.constant';
import { UserModel } from '../users/user.class';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  LOCALAPIURL: string = AppConstant.getUrl() + "/users";
  constructor(private coreHttpService: CoreHttpService) {
  }

  validateUser(email: string, pass: string) {
    let url = this.LOCALAPIURL + "?EmailAddress=" + email + "&Password=" + pass + "&IsActive=" + true;
    return this.coreHttpService.httpGetRequest<Array<UserModel>>(url);
  }

  validateEmail(email: string) {
    let url = this.LOCALAPIURL + "?EmailAddress=" + email;
    return this.coreHttpService.httpGetRequest<Array<UserModel>>(url);
  }

  GetidbyEmail(email: string) {
    let url = this.LOCALAPIURL + "?EmailAddress=" + email;
    return this.coreHttpService.httpGetRequest<any>(url);
  }

  getById(id: number) {
    return this.coreHttpService.httpGetRequest(this.LOCALAPIURL + '?id=' + id);
  }
  updateRecord(record: UserModel) {
    return this.coreHttpService.httpPutRequest<UserModel, any>(this.LOCALAPIURL + '/' + record.id, record);
  }

  insert(data: UserModel) {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.coreHttpService.httpPostRequest<any, UserModel>(this.LOCALAPIURL,
      JSON.stringify(data), header);
  }

}



@Injectable()
export class GetUserById implements Resolve<any> {
  constructor(private _userService: AuthenticationService) { }
  resolve(route: ActivatedRouteSnapshot): any {

    return this._userService.getById(Number(route.paramMap.get('id')));
  }
}
