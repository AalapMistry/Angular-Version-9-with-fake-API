import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-list.component.html',
    styleUrls: ['./error-list.component.scss']
})
export class ErrorDialogComponent implements OnInit {

    title: string;
    closeBtnName: string;
    list: any[] = [];

    constructor(
        public bsModalRef: BsModalRef
    ) { }

    ngOnInit() {
    }

}
