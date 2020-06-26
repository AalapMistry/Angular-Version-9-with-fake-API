import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CoreHelperService } from 'src/app/core/core-helper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoreFormValidationService } from 'src/app/core/core-form-validation.service';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../user.class';
import * as _ from "lodash";
import { UserService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable } from 'rxjs';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-manage.component.html',
    styleUrls: ['./user-manage.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UsersManageEditComponent implements OnInit, AfterViewInit, OnDestroy {
    config: AngularEditorConfig;
    userForm: FormGroup;
    hide: boolean = true;

    userDetails: UserModel = new UserModel();
    isEdit: boolean = true;
    imageToShow: string = "";



    galleryType: string = "";
    galleryImageData: any = [];
    uploadedData: any = [];

    userId: number = 0;
    galleryMainData: any = {};

    isExist: boolean = true;
    constructor(
        private coreHelperService: CoreHelperService,
        private router: Router,
        private formBuilder: FormBuilder,
        private coreFormValidationService: CoreFormValidationService,
        private configDate: NgbDatepickerConfig,
        private userService: UserService,
        private toaster: ToastrService,
        private route: ActivatedRoute,

    ) {
    }

    ngOnInit(): void {
        this.config = this.coreHelperService.returnSetting('Enter About User here...');
        this.configDate.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
        this.userForm = this.initUserForm();
        this.patchValueInForm(); this.imageToShow = this.userDetails.ProfileImage;
    }

    patchValueInForm = () => {
        this.route.data.subscribe(res => {
            if (!!res && !!res.userData[0]) {
                this.userDetails = res.userData[0];
                this.userForm.patchValue(res.userData[0]);
                this.userId = this.userDetails.id;
            }
        });
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
            'WebsiteUrl':["",Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
            'TwitterUrl':["",[]],
            'LinkedinUrl':["",[]]
            // 'Password': [null, Validators.compose([
            //     Validators.required,
            //     this.coreFormValidationService.patternValidator(/\d/, { hasNumber: true }),
            //     this.coreFormValidationService.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
            //     this.coreFormValidationService.patternValidator(/[a-z]/, { hasSmallCase: true }),
            //     Validators.minLength(8)
            // ])],
            // 'ConfirmPassword': [null, Validators.compose([Validators.required])],
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
        if (this.userForm.invalid) {
            this.coreFormValidationService.formValidate(this.userForm, false);
        } else {
            // call API..
            let record: UserModel = Object.assign(this.userDetails, this.userForm.value);
            if (!!this.imageToShow && this.imageToShow !== "")
                record.ProfileImage = this.imageToShow;

            this.updateRecord(record);
        }
    }

    save() {
        this.isExist = false;
    }
    saveandexit() {
        this.isExist = true;
    }

    updateRecord(data: UserModel) {
        this.userService.updateRecord(data)
            .subscribe(res => {
                if (!!localStorage.getItem("LoggedUserDetails")) {
                    let user = <UserModel>JSON.parse(localStorage.getItem("LoggedUserDetails"));
                    if (!!user && user.id == data.id) {
                        this.coreHelperService.sendUserChangedInfo(data);
                    }
                }
                this.toaster.success("record updated successfully.", "Success");
                if (this.isExist)
                    this.back();
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
                debugger;
                if (!!data && data.length >= 1) {
                    this.galleryImageData = data;
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
                        fileName: event.target.files[i].name
                    }
                    if (!_.find(this.uploadedData, logo => { return logo.fileName == event.target.files[i].name })) {
                        this.galleryImageData.push({ userGalleryData: data });
                    }
                }
                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }

    removeImage(imageData) {
        if (!!imageData && !!imageData.id) {
            this.userService.deleteGalleryData(imageData.id)
                .subscribe(data => {
                    this.changeGalleryType();
                });
        } else {
            this.galleryImageData = _.filter(this.galleryImageData, d => { return d.userGalleryData.fileName != imageData.userGalleryData.fileName });
        }
    }

    uploadGalleryData() {
        let filterRecod = _.filter(this.galleryImageData, data => { return !data.id });
        if (!!filterRecod && filterRecod.length >= 1) {
            let response = [];

            _.each(filterRecod, data => {
                let dataToSave = {
                    userId: this.userId,
                    galleryType: this.galleryType,
                    userGalleryData: data.userGalleryData
                }
                response.push(this.userService.insertUserGalleryData(dataToSave));
            });
            this.insertMultiplData(response)
                .subscribe(data => {
                    this.toaster.success("record saved successfully.");
                });
        }
    }
    insertMultiplData(response): Observable<any> {
        return forkJoin(response);
    }
    ngOnDestroy(): void {
    }

}
