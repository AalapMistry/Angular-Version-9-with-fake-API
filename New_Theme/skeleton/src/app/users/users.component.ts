import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { UserService } from './users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreHelperService } from '../core/core-helper.service';
import { UserModel } from './user.class';
import Swal from 'sweetalert2';
import { Subject, Observable, forkJoin } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import * as _ from "lodash";

@Component({
    selector: 'app-user-page',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersPageComponent implements OnInit, AfterViewInit, OnDestroy {

    userList: Array<UserModel> = new Array<UserModel>();
    dtOptions: DataTables.Settings | any = {
        ordering: true,
        order: [],
        responsive: true,
        dom: 'Blfrtip',
        buttons: [
            'print',
            'excel',
            'csv'
        ],
        columnDefs: [{
            'targets': [0, 6, 7], /* column index */
            'orderable': false, /* true or false */
        }],

    };

    dtTrigger = new Subject();
    // @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective;
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;

    IsSelectAll: boolean = false;
    selectedCount: number = 0;

    private alive: boolean;

    constructor(
        private userService: UserService,
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
        this.initUserList();
    }
    openAdd() {
        this.router.navigate(['/user-list/user-add']);
    }
    edit(id) {
        this.router.navigate(['/user-list/user-edit', { id: id }]);
    }
    gotoProfile(id) {
        this.router.navigate(['/user-list/user-profile', { id: id }]);

    }
    initUserList = () => {
        this.route.data.subscribe(res => {
            if (!!res && !!res.userList) {
                this.userList = res.userList;
                this.changeSelection();
            }
        });
    }

    setIsActiveRecord(value, record: UserModel) {
        let message = "Do you want to Deactive this record?";
        if (!value) {
            message = "Do you want to Active this record?";
        }
        this.coreHelperService.showConfirmDialog("Are you sure?", message, 'question', true)
            .then((result) => {
                if (result.value) {
                    // API Call
                    record.IsActive = (!record.IsActive);
                    this.userService.updateRecord(record)
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

    activeOrDeactiveallUser(filterR, showMessage) {
        let message = "Do you want to " + showMessage + " all selected items?";
        let itemToUpdate = _.filter(this.userList, l => { return l.IsChecked && l.IsActive == filterR });
        if (itemToUpdate.length >= 1) {
            this.coreHelperService.showConfirmDialog("Are you sure?", message, 'question', true)
                .then((result) => {
                    if (result.value) {
                        let response: any = [];
                        _.each(itemToUpdate, item => {
                            item.IsActive = (!item.IsActive);
                            response.push(this.userService.updateRecord(item));
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

    updateMultipleItems(response): Observable<any> {
        return forkJoin(response);
    }

    deleteRecord(id) {
        this.coreHelperService.showConfirmDialog("Are you sure?",
            'You will not be able to recover this record!', 'warning', true)
            .then((result) => {
                if (result.value) {
                    // API Call
                    this.userService.deleteRecord(id)
                        .pipe(takeWhile(() => this.alive))
                        .subscribe(data => {
                            Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
                            this.refreshRecord();
                        });
                }
            });
    }

    refreshRecord = () => {
        this.userService.getUserDataList()
            .pipe(takeWhile(() => this.alive))
            .subscribe(data => {
                this.userList = data;
                this.rerender();
                this.IsSelectAll = false;
                this.changeSelection();
            });
    }

    rerender(): void {
        this.coreHelperService.dataTableRefreshRenderer(this.dtElement, this.dtTrigger);
    }

    changeSelection() {
        _.each(this.userList, list => { list['IsChecked'] = this.IsSelectAll });
        this.filterselected();
    }
    changeSelectionlogic(e) {
        this.IsSelectAll = (_.filter(this.userList, l => { return l.IsChecked }).length == this.userList.length);
        this.filterselected();
    }

    private filterselected() {
        this.selectedCount = _.filter(this.userList, list => { return list.IsChecked }).length;
    }
    private getDate(date: any) {
        if (!!date) {
            return new Date(date['year'], date['month'] - 1, date['day']);
        }
    }
    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
        this.alive = false;
    }

}
