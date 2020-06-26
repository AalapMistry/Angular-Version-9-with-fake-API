import { Injectable } from "@angular/core";
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/catch";
import 'rxjs/add/operator/map';
import { LoaderService } from "./core-loader.service";

@Injectable()
export class CoreHttpService {
    constructor(
        private http: HttpClient,
        private loaderService: LoaderService
    ) { }
    /**
     *
     *
     * @template TResponse
     * @param {string} url
     * @param {HttpHeaders} [reqHeader]
     * @param {boolean} [showLoader]
     * @returns {Observable<TResponse>}
     * @memberof CoreHttpService
     */
    httpGetRequest<TResponse>(
        url: string,
        reqHeader?: HttpHeaders,
        showLoader?: boolean
    ): Observable<TResponse> {
        showLoader = showLoader === undefined ? true : showLoader;
        this.loaderService.display(showLoader);
        return this.http
            .get(url, { headers: reqHeader })
            .map(res => {
                this.loaderService.display(false);
                return res as TResponse;
            })
            .catch(this.errorHandler);
    }

    /**
     *
     *
     * @template TRequest
     * @template TResponse
     * @param {string} url
     * @param {TRequest} data
     * @param {HttpHeaders} [reqHeader]
     * @param {boolean} [showLoader]
     * @returns {Observable<TResponse>}
     * @memberof CoreHttpService
     */
    httpPostRequest<TRequest, TResponse>(
        url: string,
        data: TRequest,
        reqHeader?: HttpHeaders,
        showLoader?: boolean
    ): Observable<TResponse> {
        showLoader = showLoader === undefined ? true : showLoader;
        this.loaderService.display(showLoader);
        return this.http
            .post(url, data, { headers: reqHeader })
            .map(res => {
                this.loaderService.display(false);
                return res as TResponse;
            })
            .catch(this.errorHandler);
    }

    /**
     *
     *
     * @template TRequest
     * @template TResponse
     * @param {string} url
     * @param {TRequest} [id]
     * @param {boolean} [showLoader]
     * @returns {Observable<TResponse>}
     * @memberof CoreHttpService
     */
    httpDeleteRequest<TRequest, TResponse>(
        url: string,
        id?: TRequest,
        showLoader?: boolean
    ): Observable<TResponse> {
        showLoader = showLoader === undefined ? true : showLoader;
        this.loaderService.display(showLoader);
        return this.http
            .delete(url, id)
            .map(res => {
                this.loaderService.display(false);
                return res as TResponse;
            })
            .catch(this.errorHandler);
    }



    httpPutRequest<TRequest, TResponse>(
        url: string,
        data: TRequest,
        reqHeader?: HttpHeaders,
        showLoader?: boolean
    ): Observable<TResponse> {
        showLoader = showLoader === undefined ? true : showLoader;
        this.loaderService.display(showLoader);
        return this.http
            .put(url, data, { headers: reqHeader })
            .map(res => {
                this.loaderService.display(false);
                return res as TResponse;
            })
            .catch(this.errorHandler);
    }


    /**
     *
     *
     * @memberof CoreHttpService
     */
    errorHandler = (error: HttpErrorResponse) => {
        this.loaderService.display(false);

        // if (!!error && !!error.error && error.error.error_description) {
        //     this.toast.error("Failed", error.error.error_description);
        // } else {
        // this.toastrServie.error("Failed", "Something went wrong");
        // }
        if (error.error instanceof ErrorEvent) {
            console.error("An error occurred:", error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`
            );
        }
        // tslint:disable-next-line: deprecation
        return Observable.throw(error);
    }
}
