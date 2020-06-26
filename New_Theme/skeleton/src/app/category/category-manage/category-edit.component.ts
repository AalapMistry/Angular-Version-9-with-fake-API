import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CoreHelperService } from 'src/app/core/core-helper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoreFormValidationService } from 'src/app/core/core-form-validation.service';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoryModel } from '../category.class';
import Swal from 'sweetalert2';

import { ToastrService } from 'ngx-toastr';
import { CategorysService } from '../categorys.service';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-manage.component.html',
    styleUrls: ['./category-manage.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CategorysManageEditComponent implements OnInit, AfterViewInit, OnDestroy {
    config: AngularEditorConfig;
    categoryForm: FormGroup;
    hide: boolean = true;

    categoryDetails: CategoryModel = new CategoryModel();
    isEdit: boolean = true;
    imageToShow: string = "";

    categoryId: number = 0;
    isExist: boolean = true;

    constructor(
        private coreHelperService: CoreHelperService,
        private router: Router,
        private formBuilder: FormBuilder,
        private coreFormValidationService: CoreFormValidationService,
        private configDate: NgbDatepickerConfig,
        private categoryService: CategorysService,
        private toaster: ToastrService,
        private route: ActivatedRoute,

    ) {
    }

    ngOnInit(): void {
        this.config = this.coreHelperService.returnSetting('Enter About User here...');
        this.configDate.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
        this.categoryForm = this.initProductForm();
        this.patchValueInForm(); 
    }

    patchValueInForm = () => {
        debugger
        this.route.data.subscribe(res => {
            if (!!res && !!res.CategoryData[0]) {
                this.categoryDetails = res.CategoryData[0];
                this.categoryForm.patchValue(res.CategoryData[0]);
                this.categoryId=this.categoryDetails.id;
            }
        });
    }


    ngAfterViewInit(): void {

    }

    private initProductForm = () => {
        return this.formBuilder.group({
            'CategoryName': ['', [Validators.required]]
        });
    }

    onSubmit() {
        if (this.categoryForm.invalid) {
            this.coreFormValidationService.formValidate(this.categoryForm, false);
        } else {
            // call API..
            let record: CategoryModel = Object.assign(this.categoryDetails, this.categoryForm.value);

            this.updateRecord(record);
        }
    }

    save() {
        this.isExist = false;
    }
    saveandexit() {
        this.isExist = true;
    }

    updateRecord(data: CategoryModel) {
        this.categoryService.updateCategoryRecord(data)
            .subscribe(data => {
                this.toaster.success("record updated successfully.", "Success");
                if (this.isExist)
                this.back();
            });
    }

    getControls(control) {
        return this.coreFormValidationService.getControlName(this.categoryForm, control);
    }
    back() {
        this.router.navigate(['/category-list']);
    }
    ngOnDestroy(): void {

    }


}
