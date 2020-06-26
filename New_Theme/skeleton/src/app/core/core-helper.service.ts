import { Injectable } from "@angular/core";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable } from 'rxjs';
import { UserModel } from '../users/user.class';


@Injectable()
export class CoreHelperService {
    private subject = new Subject<any>();

    constructor() { }

    sendUserChangedInfo(message: any) {
        this.subject.next({ text: message });
    }
    getUserChangedInfo(): Observable<UserModel> {
        return this.subject.asObservable();

    }

    showConfirmDialog(title: string, bodyText: string, type, isShowCancelButton: boolean) {
        return Swal.fire({
            title: title,
            text: bodyText,
            type: type,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            showCancelButton: isShowCancelButton,
            confirmButtonText: 'Yes'
        })
    }
    returnSetting(placeholder) {
        return {
            editable: true,
            spellcheck: true,
            height: '6rem',
            minHeight: '3rem',
            placeholder: placeholder,
            translate: 'no',
            defaultParagraphSeparator: 'p',
            defaultFontName: 'Arial',
            toolbarHiddenButtons: [
                ['bold']
            ],
            customClasses: [
                {
                    name: "quote",
                    class: "quote",
                },
                {
                    name: 'redText',
                    class: 'redText'
                },
                {
                    name: "titleText",
                    class: "titleText",
                    tag: "h1",
                },
            ]
        };
    }

    dataTableRefreshRenderer = (dtElement: DataTableDirective, dtTrigger = new Subject()) => {
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            dtTrigger.next();
        });
    }

    generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
}