import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CoreHelperService } from 'src/app/core/core-helper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoreFormValidationService } from 'src/app/core/core-form-validation.service';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductModel } from '../Product.class';
import Swal from 'sweetalert2';

import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../products.service';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-manage.component.html',
    styleUrls: ['./product-manage.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ProductsManageEditComponent implements OnInit, AfterViewInit, OnDestroy {
    config: AngularEditorConfig;
    productForm: FormGroup;
    hide: boolean = true;

    productDetails: ProductModel = new ProductModel();
    isEdit: boolean = true;
    imageToShow: string = "";

    productId: number = 0;
    isExist: boolean = true;

    constructor(
        private coreHelperService: CoreHelperService,
        private router: Router,
        private formBuilder: FormBuilder,
        private coreFormValidationService: CoreFormValidationService,
        private configDate: NgbDatepickerConfig,
        private productService: ProductsService,
        private toaster: ToastrService,
        private route: ActivatedRoute,

    ) {
    }

    ngOnInit(): void {
        this.config = this.coreHelperService.returnSetting('Enter About User here...');
        this.configDate.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
        this.productForm = this.initProductForm();
        this.patchValueInForm(); 
        this.imageToShow = this.productDetails.Image;
    }

    patchValueInForm = () => {
        debugger
        this.route.data.subscribe(res => {
            if (!!res && !!res.ProductData[0]) {
                this.productDetails = res.ProductData[0];
                this.productForm.patchValue(res.ProductData[0]);
                this.productId=this.productDetails.id;
            }
        });
    }


    ngAfterViewInit(): void {

    }

    private initProductForm = () => {
        return this.formBuilder.group({
            'ProductName': ['', [Validators.required]],
            'Description': ['', Validators.required],
            'Stock': ['', [Validators.required]],
            'Categories': [''],
            'Price': ['', Validators.required],
        });
    }

    changeListener = (file: FileList) => {
        let fileUpload = file.item(0);
        if (fileUpload.size > 1000000) {
            this.toaster.error("File size muse be less then 1MB", "Failed");
            return;
        } else {
            var myReader = new FileReader();
            myReader.onload = (e: any) => {
                this.imageToShow = e.target.result;
            }
            myReader.readAsDataURL(fileUpload);
        }
    }

    onSubmit() {
        if (this.productForm.invalid) {
            this.coreFormValidationService.formValidate(this.productForm, false);
        } else {
            // call API..
            let record: ProductModel = Object.assign(this.productDetails, this.productForm.value);

            this.updateRecord(record);
        }
    }

    save() {
        this.isExist = false;
    }
    saveandexit() {
        this.isExist = true;
    }

    updateRecord(data: ProductModel) {
        this.productService.updateRecord(data)
            .subscribe(data => {
                this.toaster.success("record updated successfully.", "Success");
                if (this.isExist)
                this.back();
            });
    }

    getControls(control) {
        return this.coreFormValidationService.getControlName(this.productForm, control);
    }
    back() {
        this.router.navigate(['/product-list']);
    }
    ngOnDestroy(): void {

    }


}
