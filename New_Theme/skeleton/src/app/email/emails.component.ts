import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CoreHelperService } from '../core/core-helper.service';
import { EmailModel } from './email.class';
import Swal from 'sweetalert2';
import { Subject, forkJoin, Observable } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { EmailsService } from './emails.service';
import * as _ from "lodash";

@Component({
    selector: 'app-emails-page',
    templateUrl: './emails.component.html',
    styleUrls: ['./emails.component.scss']
})
export class EmailsPageComponent implements OnInit, AfterViewInit, OnDestroy {

    emailList: Array<EmailModel> = new Array<EmailModel>();
    dtOptions: DataTables.Settings | any = {
        ordering: true,
        order: [],
        responsive: true,
        columnDefs: [{
            'targets': [0, 3, 4], /* column index */
            'orderable': false, /* true or false */
        }]

    };
    dtTrigger = new Subject();
    // @ViewChild(DataTableDirective, { static: false })
    @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective;

    IsSelectAll: boolean = false;
    selectedCount: number = 0;
    dtElement: DataTableDirective;

    private alive: boolean;
    constructor(
        private emailsService: EmailsService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private coreHelperService: CoreHelperService,
    ) { }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    ngOnInit() {
        this.alive = true;
        this.initEmailList();

    }
    openAdd() {
        this.router.navigate(['/email-list/email-add']);
    }

    edit(id) {
        this.router.navigate(['/email-list/email-edit', { id: id }]);
    }

    initEmailList = () => {
        this.route.data.subscribe(res => {
            if (!!res && !!res.EmailList) {
                this.emailList = res.EmailList;

            }
        });
    }


    deleteRecord(id) {
        this.coreHelperService.showConfirmDialog("Are you sure?",
            'You will not be able to recover this record!', 'warning', true)
            .then((result) => {
                if (result.value) {
                    // API Call
                    this.emailsService.deleteRecord(id)
                        .pipe(takeWhile(() => this.alive))
                        .subscribe(data => {
                            Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
                            this.refreshRecord();
                        });
                }
            });
    }

    setIsActiveRecord(value, record: EmailModel) {
        let message = "Do you want to Deactive this record?";
        if (!value) {
            message = "Do you want to Active this record?";
        }
        this.coreHelperService.showConfirmDialog("Are you sure?", message, 'question', true)
            .then((result) => {
                if (result.value) {
                    // API Call
                    record.IsActive = (!record.IsActive);
                    this.emailsService.updateRecord(record)
                        .pipe(takeWhile(() => this.alive))
                        .subscribe(data => {
                            if (!!data) {
                                this.toastr.success('Record has been updated successfully', 'Success');
                                this.refreshRecord();
                            }
                        });
                }
            });
    }

    activeOrDeactiveallEmail(filterR, showMessage) {
        let message = "Do you want to " + showMessage + " all selected items?";
        let itemToUpdate = _.filter(this.emailList, l => { return l.IsChecked && l.IsActive == filterR });
        if (itemToUpdate.length >= 1) {
            this.coreHelperService.showConfirmDialog("Are you sure?", message, 'question', true)
                .then((result) => {
                    if (result.value) {
                        let response: any = [];
                        _.each(itemToUpdate, item => {
                            item.IsActive = (!item.IsActive);
                            response.push(this.emailsService.updateRecord(item));
                        });
                        if (response.length >= 1) {
                            this.updateMultipleItems(response)
                                .subscribe(data => {
                                    this.toastr.success("record updated successfully.", "success");
                                    this.refreshRecord();
                                });
                        }
                    }
                });
        } else {
            Swal.fire('No Record!', 'there are no record available to update please select proper item.', 'info');
        }
    }

    changeSelection() {
        _.each(this.emailList, list => { list['IsChecked'] = this.IsSelectAll });
        this.filterselected();
    }
    changeSelectionlogic(e) {
        this.IsSelectAll = (_.filter(this.emailList, l => { return l.IsChecked }).length == this.emailList.length);
        this.filterselected();
    }
    private filterselected() {
        this.selectedCount = _.filter(this.emailList, list => { return list.IsChecked }).length;
    }
    updateMultipleItems(response): Observable<any> {
        return forkJoin(response);
    }

    private getDate(date: any) {
        if (!!date) {
            return new Date(date['year'], date['month'] - 1, date['day']);
        }
    }
    private refreshRecord = () => {
        this.emailsService.getEmailDataList().pipe(takeWhile(() => this.alive))
            .subscribe(data => { this.emailList = data; this.rerender(); });
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
        });
    }
    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
        this.alive = false;
    }

}
