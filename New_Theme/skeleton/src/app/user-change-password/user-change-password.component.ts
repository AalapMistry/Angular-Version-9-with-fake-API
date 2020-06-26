import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CoreHelperService } from 'src/app/core/core-helper.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoreFormValidationService } from 'src/app/core/core-form-validation.service';
import { NgbDate, NgbCalendar, NgbDatepickerConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordModel } from './changePassword.class';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../users/users.service';

@Component({
    selector: 'app-user-change-password-add',
    templateUrl: './user-change-password.component.html',
    styleUrls: ['./user-change-password.component.scss'],
    // encapsulation: ViewEncapsulation.None
})

export class UserChangePasswordComponent implements OnInit, AfterViewInit {
    config: AngularEditorConfig;
    userChangeForm: FormGroup;
    hide: boolean = true;
    closeResult: string;

    constructor(
        private coreHelperService: CoreHelperService,
        private router: Router,
        private formBuilder: FormBuilder,
        private coreFormValidationService: CoreFormValidationService,
        private configDate: NgbDatepickerConfig,
        private userService: UserService,
        private toaster: ToastrService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal
    ) {
    }

    ngOnInit(): void {
        this.config = this.coreHelperService.returnSetting('Enter About Product here...');
        this.configDate.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
        this.userChangeForm = this.inituserChangeForm();
    }

    ngAfterViewInit(): void {

    }
    private inituserChangeForm = () => {
        return this.formBuilder.group({
            'Email': ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            'Password': [null, Validators.compose([
                Validators.required,
                this.coreFormValidationService.patternValidator(/\d/, { hasNumber: true }),
                this.coreFormValidationService.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                this.coreFormValidationService.patternValidator(/[a-z]/, { hasSmallCase: true }),
                Validators.minLength(8)
            ])],
            'NewPassword': [null, Validators.compose([
                Validators.required,
                this.coreFormValidationService.patternValidator(/\d/, { hasNumber: true }),
                this.coreFormValidationService.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                this.coreFormValidationService.patternValidator(/[a-z]/, { hasSmallCase: true }),
                Validators.minLength(8)
            ])],
        });
    }


    onSubmit() {
        if (this.userChangeForm.invalid) {
            this.coreFormValidationService.formValidate(this.userChangeForm, false);
        }
        else {
            let record: ChangePasswordModel = Object.assign(this.userChangeForm.value);
            // call API..
            this.checkRecord(record);
        }
    }

    checkRecord(data: ChangePasswordModel) {
        this.userService.getByEmailAndPassword(data.Email, data.Password)
            .subscribe(data => {
                if (!!data) {
                    // if record found then change new password 

                }
            });
    }

    getControls(control) {
        return this.coreFormValidationService.getControlName(this.userChangeForm, control);
    }

}
