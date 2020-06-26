import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CoreHelperService } from 'src/app/core/core-helper.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoreFormValidationService } from 'src/app/core/core-form-validation.service';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { EmailModel } from '../email.class';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { EmailsService } from '../emails.service';

@Component({
    selector: 'app-email-add',
    templateUrl: './email-manage.component.html',
    styleUrls: ['./email-manage.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class EmailsManageAddComponent implements OnInit, AfterViewInit {
    config: AngularEditorConfig;
    emailForm: FormGroup;
    hide: boolean = true;


    constructor(
        private coreHelperService: CoreHelperService,
        private router: Router,
        private formBuilder: FormBuilder,
        private coreFormValidationService: CoreFormValidationService,
        private configDate: NgbDatepickerConfig,
        private emailservice: EmailsService,
        private toaster: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.config = this.coreHelperService.returnSetting('Enter About Product here...');
        this.configDate.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
        this.emailForm = this.initEmailForm();
    }

    ngAfterViewInit(): void {

    }
    private initEmailForm = () => {
        return this.formBuilder.group({
            'TemplateCode': ['', [Validators.required]],
            'TemplateName': ['', Validators.required],
            'Subject': ['', [Validators.required]],
            'Body': ['', Validators.required],
            'IsActive': [''],
        });
    }


    onSubmit() {
        if (this.emailForm.invalid) {
            this.coreFormValidationService.formValidate(this.emailForm, false);
        }
        else {
            let record: EmailModel = Object.assign(this.emailForm.value);
            // call API..
            this.insertRecord(record);
        }
    }

    insertRecord(data: EmailModel) {
        debugger
        this.emailservice.insert(data)
            .subscribe(data => {
                if (!!data) {
                    this.toaster.success("record inserted successfully.", "Success");
                    this.back();
                }
            });
    }

    getControls(control) {
        return this.coreFormValidationService.getControlName(this.emailForm, control);
    }
    back() {
        this.router.navigate(['/email-list']);
    }
    
}
