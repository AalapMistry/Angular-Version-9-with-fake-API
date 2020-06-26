import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CoreHelperService } from 'src/app/core/core-helper.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoreFormValidationService } from 'src/app/core/core-form-validation.service';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../user.class';
import Swal from 'sweetalert2';
import { UserService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/authentication/authntication.service';
import * as _ from "lodash";

@Component({
    selector: 'app-user-add',
    templateUrl: './user-manage.component.html',
    styleUrls: ['./user-manage.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UsersManageAddComponent implements OnInit, AfterViewInit, OnDestroy {
    config: AngularEditorConfig;
    userForm: FormGroup;
    hide: boolean = true;

    imageToShow: string = "";
    isEdit: boolean = false;

    galleryType: string = "";

    galleryImageData: any = [];
    uploadedData: any = [];
    galleryMainData: any = {};
    userId: number = 0;
    isExist: boolean = true;
    constructor(
        private coreHelperService: CoreHelperService,
        private router: Router,
        private formBuilder: FormBuilder,
        private coreFormValidationService: CoreFormValidationService,
        private configDate: NgbDatepickerConfig,
        private userService: UserService,
        private toaster: ToastrService,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit(): void {
        this.config = this.coreHelperService.returnSetting('Enter About User here...');
        this.configDate.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
        this.userForm = this.initUserForm();
    }

    ngAfterViewInit(): void {

    }
    private initUserForm = () => {
        return this.formBuilder.group({
            'FirstName': ['', [Validators.required]],
            'LastName': ['', Validators.required],
            'EmailAddress': ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            'Gender': ['', [Validators.required]],
            'Age': ['', [Validators.required]],
            'BirthDate': [this.configDate, [Validators.required]],
            'Skills': [''],
            'AboutUser': ['', [Validators.required]],
            'Address1': ['', [Validators.required]],
            'Address2': ['', [Validators.required]],
            'MobileNumber': ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            'PostalCode': ['', [Validators.required]],
            'IsActive': [true],
            'Password': [null, Validators.compose([
                Validators.required,
                this.coreFormValidationService.patternValidator(/\d/, { hasNumber: true }),
                this.coreFormValidationService.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                this.coreFormValidationService.patternValidator(/[a-z]/, { hasSmallCase: true }),
                Validators.minLength(8)
            ])],
            'ConfirmPassword': [null, Validators.compose([Validators.required])],
            'WebsiteUrl': ["", Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
            'TwitterUrl': ["", []],
            'LinkedinUrl': ["", []]
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

    onSubmit(isNavigate) {
        debugger;
        if (this.userForm.invalid) {
            this.coreFormValidationService.formValidate(this.userForm, false);
        } else {
            let record: UserModel = Object.assign(this.userForm.value);
            if (record.Password !== record.ConfirmPassword) {
                Swal.fire("Password does not match");
            } else {
                // call API..
                this.authenticationService.validateEmail(record.EmailAddress)
                    .subscribe(data => {
                        if (!!data && data.length >= 1) {
                            Swal.fire('Exist!', 'User with email address already exist in system.', 'error');
                        } else {
                            record.ProfileImage = this.imageToShow;
                            this.insertRecord(record);
                        }
                    });
            }
        }
    }

    save() {
        this.isExist = false;
    }
    saveandexit() {
        this.isExist = true;
    }
    insertRecord(data: UserModel) {
        this.userService.insert(data)
            .subscribe(data => {
                if (!!data) {
                    this.userId = data.id;
                    this.toaster.success("record inserted successfully.", "Success");
                    if (this.isExist)
                        this.back();
                }
            });
    }

    getControls(control) {
        return this.coreFormValidationService.getControlName(this.userForm, control);
    }
    back() {
        this.router.navigate(['/user-list']);
    }

    /////////////////////////////////// for Gallery========================================

    changeGalleryType = () => {
        this.userService.getUserGalleryDataByUserAndGType(this.userId, this.galleryType)
            .subscribe(data => {
                if (!!data && data.length >= 1) {
                    this.galleryMainData = data[0];
                    this.galleryImageData = data[0].userGalleryData;
                } else {
                    this.galleryImageData = [];
                }
            });
    }
    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (e: any) => {
                    let data: any = {
                        extension: "." + event.target.files[i].name.split('.').pop(),
                        fileData: e.target.result,
                        fileName: event.target.files[i].name,
                        id: this.coreHelperService.generateGUID()
                    }
                    if (!_.find(this.uploadedData, logo => { return logo.fileName == event.target.files[i].name })) {
                        this.galleryImageData.push(data);
                        this.uploadedData.push(data);
                    }
                }
                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }
    removeImage(imageData) {
        this.galleryImageData = _.filter(this.galleryImageData, d => { return d.id !== imageData.id });
        this.uploadedData = this.galleryImageData;
        if (!!this.galleryMainData && this.galleryMainData.id) {
            this.removeGalleryDataAndInsertNew();
        }
    }
    removeGalleryDataAndInsertNew() {
        this.userService.deleteGalleryData(this.galleryMainData.id)
            .subscribe(data => {
                this.uploadGalleryData();
            });
    }
    uploadGalleryData() {
        if (!!this.galleryImageData && this.galleryImageData.length >= 1) {
            let dataToSave = {
                userId: this.userId,
                galleryType: this.galleryType,
                userGalleryData: this.galleryImageData
            };
            this.userService.insertUserGalleryData(dataToSave)
                .subscribe(data => {
                    this.toaster.success("record saved successfully.", "Success");
                    this.changeGalleryType();
                });
        }
    }


    ngOnDestroy(): void {

    }


}
