import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CoreHelperService } from '../core/core-helper.service';
import { ProductModel } from './Product.class';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from './products.service';

@Component({
    selector: 'app-products-page',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsPageComponent implements OnInit, AfterViewInit, OnDestroy {

    productList: Array<ProductModel> = new Array<ProductModel>();
    dtOptions: DataTables.Settings | any = {
        ordering: true,
        order: [],
        responsive: true,
        columnDefs: [{
            'targets': [0, 2, 3], /* column index */
            'orderable': false, /* true or false */
        }]

    };
    dtTrigger = new Subject();
    // @ViewChild(DataTableDirective, { static: false })
    @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective;

    dtElement: DataTableDirective;

    private alive: boolean;
    constructor(
        private productservice: ProductsService,
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
        this.initProductList();

    }
    openAdd() {
        this.router.navigate(['/product-list/product-add']);
    }

    edit(id) {
        this.router.navigate(['/product-list/product-edit', { id: id }]);
    }

    initProductList = () => {
        this.route.data.subscribe(res => {
            if (!!res && !!res.ProductList) {
                this.productList = res.ProductList;

            }
        });
    }


    deleteRecord(id) {
        this.coreHelperService.showConfirmDialog("Are you sure?",
            'You will not be able to recover this record!', 'warning', true)
            .then((result) => {
                if (result.value) {
                    // API Call
                    this.productservice.deleteRecord(id)
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
        this.productservice.getProductDataList().pipe(takeWhile(() => this.alive))
            .subscribe(data => { this.productList = data; this.rerender(); });
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
