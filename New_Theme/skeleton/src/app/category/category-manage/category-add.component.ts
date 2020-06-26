import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CoreHelperService } from 'src/app/core/core-helper.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoreFormValidationService } from 'src/app/core/core-form-validation.service';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoryModel } from '../Category.class';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { CategorysService } from '../categorys.service';

@Component({
    selector: 'app-category-add',
    templateUrl: './category-manage.component.html',
    styleUrls: ['./category-manage.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CategorysManageAddComponent implements OnInit, AfterViewInit {
    config: AngularEditorConfig;
    categoryForm: FormGroup;
    hide: boolean = true;

    imageToShow: string = "";
    constructor(
        private coreHelperService: CoreHelperService,
        private router: Router,
        private formBuilder: FormBuilder,
        private coreFormValidationService: CoreFormValidationService,
        private configDate: NgbDatepickerConfig,
        private categoryservice: CategorysService,
        private toaster: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.config = this.coreHelperService.returnSetting('Enter About Product here...');
        this.configDate.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
        this.categoryForm = this.initProductForm();
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
        }
        else {
            let record: CategoryModel = Object.assign(this.categoryForm.value);
            // call API..
            this.insertRecord(record);
        }
    }

    insertRecord(data: CategoryModel) {
        this.categoryservice.insertCategoryRecord(data)
            .subscribe(data => {
                if (!!data) {
                    this.toaster.success("record inserted successfully.", "Success");
                    this.back();
                }
            });
    }

    getControls(control) {
        return this.coreFormValidationService.getControlName(this.categoryForm, control);
    }
    back() {
        this.router.navigate(['/category-list']);
    }
    
}
