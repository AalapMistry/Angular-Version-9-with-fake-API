import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CoreHelperService } from 'src/app/core/core-helper.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoreFormValidationService } from 'src/app/core/core-form-validation.service';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductModel } from '../Product.class';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../products.service';

@Component({
    selector: 'app-product-add',
    templateUrl: './product-manage.component.html',
    styleUrls: ['./product-manage.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ProductsManageAddComponent implements OnInit, AfterViewInit {
    config: AngularEditorConfig;
    productForm: FormGroup;
    hide: boolean = true;

    imageToShow: string = "";
    constructor(
        private coreHelperService: CoreHelperService,
        private router: Router,
        private formBuilder: FormBuilder,
        private coreFormValidationService: CoreFormValidationService,
        private configDate: NgbDatepickerConfig,
        private productservice: ProductsService,
        private toaster: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.config = this.coreHelperService.returnSetting('Enter About Product here...');
        this.configDate.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
        this.productForm = this.initProductForm();
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
        }
        else {
            let record: ProductModel = Object.assign(this.productForm.value);
            // call API..
            this.insertRecord(record);
        }
    }

    insertRecord(data: ProductModel) {
        debugger
        this.productservice.insert(data)
            .subscribe(data => {
                if (!!data) {
                    this.toaster.success("record inserted successfully.", "Success");
                    this.back();
                }
            });
    }

    getControls(control) {
        return this.coreFormValidationService.getControlName(this.productForm, control);
    }
    back() {
        this.router.navigate(['/product-list']);
    }
    
}
