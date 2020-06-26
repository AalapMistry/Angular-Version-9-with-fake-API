import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CoreHelperService } from 'src/app/core/core-helper.service';
import { CategoryModel } from './category.class';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { CategorysService } from './categorys.service';

@Component({
    selector: 'app-categorys-page',
    templateUrl: './categorys.component.html',
    styleUrls: ['./categorys.component.scss']
})
export class CategorysPageComponent implements OnInit, AfterViewInit, OnDestroy {

    categoryList: Array<CategoryModel> = new Array<CategoryModel>();
    dtOptions: DataTables.Settings | any = {
        ordering: true,
        order: [],
        responsive: true,
        columnDefs: [{
            'targets': [0, 1], /* column index */
            'orderable': false, /* true or false */
        }]

    };
    dtTrigger = new Subject();
    // @ViewChild(DataTableDirective, { static: false })
    @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective;

    dtElement: DataTableDirective;

    private alive: boolean;
    constructor(
        private categoryservice: CategorysService,
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
        this.initCategoryList();

    }
    openAdd() {
        this.router.navigate(['/category-list/category-add']);
    }

    edit(id) {
        this.router.navigate(['/category-list/category-edit', { id: id }]);
    }

    initCategoryList = () => {
        this.route.data.subscribe(res => {
            if (!!res && !!res.CategoryList) {
                this.categoryList = res.CategoryList;
            }
        });
    }


    deleteRecord(id) {
        this.coreHelperService.showConfirmDialog("Are you sure?",
            'You will not be able to recover this record!', 'warning', true)
            .then((result) => {
                if (result.value) {
                    // API Call
                    this.categoryservice.deleteCategoryRecord(id)
                        .pipe(takeWhile(() => this.alive))
                        .subscribe(data => {
                            Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
                            this.refreshRecord();
                        });
                }
            });
    }

    private getDate(date: any) {
        if (!!date) {
            return new Date(date['year'], date['month'] - 1, date['day']);
        }
    }
    private refreshRecord = () => {
        this.categoryservice.getCategoryDataList().pipe(takeWhile(() => this.alive))
            .subscribe(data => { this.categoryList = data; this.rerender(); });
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
