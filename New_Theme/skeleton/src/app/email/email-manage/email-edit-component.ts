import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CoreHelperService } from 'src/app/core/core-helper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoreFormValidationService } from 'src/app/core/core-form-validation.service';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { EmailModel } from '../email.class';
import Swal from 'sweetalert2';

import { ToastrService } from 'ngx-toastr';
import { EmailsService } from '../emails.service';

@Component({
    selector: 'app-email-edit',
    templateUrl: './email-manage.component.html',
    styleUrls: ['./email-manage.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class EmailsManageEditComponent implements OnInit, AfterViewInit, OnDestroy {
    config: AngularEditorConfig;
    emailForm: FormGroup;
    hide: boolean = true;

    emailDetails: EmailModel = new EmailModel();
    isEdit: boolean = true;
    imageToShow: string = "";

    emailId: number = 0;
    isExist: boolean = true;

    constructor(
        private coreHelperService: CoreHelperService,
        private router: Router,
        private formBuilder: FormBuilder,
        private coreFormValidationService: CoreFormValidationService,
        private configDate: NgbDatepickerConfig,
        private emailService: EmailsService,
        private toaster: ToastrService,
        private route: ActivatedRoute,

    ) {
    }

    ngOnInit(): void {
        this.config = this.coreHelperService.returnSetting('Enter About User here...');
        this.configDate.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
        this.emailForm = this.initEmailForm();
        this.patchValueInForm(); 
    }

    patchValueInForm = () => {
        this.route.data.subscribe(res => {
            if (!!res && !!res.EmailData[0]) {
                this.emailDetails = res.EmailData[0];
                this.emailForm.patchValue(res.EmailData[0]);
                this.emailId=this.emailDetails.id;
            }
        });
    }


    ngAfterViewInit(): void {

    }

    private initEmailForm = () => {
        return this.formBuilder.group({
            'TemplateCode': ['', [Validators.required]],
            'TemplateName': ['', Validators.required],
            'Subject': ['', [Validators.required]],
            'Body': ['', Validators.required],
            'IsActive': [true],
        });
    }

    onSubmit() {
        if (this.emailForm.invalid) {
            this.coreFormValidationService.formValidate(this.emailForm, false);
        } else {
            // call API..
            let record: EmailModel = Object.assign(this.emailDetails, this.emailForm.value);

            this.updateRecord(record);
        }
    }

    save() {
        this.isExist = false;
    }
    saveandexit() {
        this.isExist = true;
    }

    updateRecord(data: EmailModel) {
        this.emailService.updateRecord(data)
            .subscribe(data => {
                this.toaster.success("record updated successfully.", "Success");
                if (this.isExist)
                this.back();
            });
    }

    getControls(control) {
        return this.coreFormValidationService.getControlName(this.emailForm, control);
    }
    back() {
        this.router.navigate(['/email-list']);
    }
    ngOnDestroy(): void {

    }


}
