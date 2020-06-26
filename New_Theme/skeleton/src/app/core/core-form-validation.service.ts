import { Injectable } from "@angular/core";
import { FormGroup, FormControl, FormArray, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ErrorDialogComponent } from "./dialog/error-list.component";

@Injectable()
export class CoreFormValidationService {
    bsModalRef: BsModalRef;
    constructor(
        private modalService: BsModalService
    ) {
    }

    formValidate = (validateForm: FormGroup | any, isShownInToaster?: boolean, ) => {
        let errors = this.getFormValidationErrors(validateForm);
        if (!!errors && errors.length >= 1) {
            if (isShownInToaster) {
                errors.forEach(e => {
                    // this.toastr.warning(e, "Error!");
                });
            } else {

                const initialState = {
                    list: errors,
                    title: 'Errors'
                };
                this.bsModalRef = this.modalService.show(ErrorDialogComponent, { initialState });
                this.bsModalRef.content.closeBtnName = 'Close';
            }
        }
    }


    getFormValidationErrors = (validateForm: FormGroup | any) => {

        let errors: string[] = [];
        if (validateForm.invalid) {
            if (validateForm instanceof FormGroup) {
                for (let formControls in validateForm.controls) {
                    if (validateForm.controls[formControls] instanceof FormControl) {
                        if (validateForm.controls[formControls].invalid) {
                            var str = formControls.replace("Id", "");
                            str = str.charAt(0).toUpperCase() + str.slice(1);
                            // if (str === "EmailAddress") {
                            //     str = "Bio"
                            // }
                            errors.push(this.getErrorMessage(validateForm.controls[formControls].errors, str));
                        }
                    }
                    else if (validateForm.controls[formControls] instanceof FormArray) {
                        let counter = 0;
                        (<FormArray>validateForm.controls[formControls]).controls.forEach(element => {
                            counter++;
                            if (element instanceof FormGroup) {
                                for (let formControlsFronFormArray in element.controls) {
                                    if (element.controls[formControlsFronFormArray] instanceof FormControl) {
                                        if (element.controls[formControlsFronFormArray].invalid) {
                                            errors.push(this.getErrorMessage(element.controls[formControlsFronFormArray].errors, formControlsFronFormArray + ' ' + counter))
                                        }
                                    }
                                    else if (element.controls[formControlsFronFormArray] instanceof FormArray) {
                                        (<FormArray>element.controls[formControlsFronFormArray]).controls.forEach(ele => {
                                            if (ele instanceof FormGroup) {
                                                this.getFormValidationErrors(ele);
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }
        return errors;
    }
    getErrorMessage = (error: any, formControlName: string) => {
        formControlName = formControlName.replace(/([A-Z])/g, ' $1').trim();
        formControlName = formControlName.toLowerCase();
        formControlName = formControlName.charAt(0).toUpperCase() + formControlName.slice(1);

        let errorMessage: string = "";

        switch (Object.getOwnPropertyNames(error)[0]) {
            case "required":
                errorMessage = formControlName + " is required.";
                break;
            case "minlength":
                errorMessage = formControlName + " length is too small.";
                break;
            case "maxlength":
                errorMessage = formControlName + " length is too large.";
                break;
            case "email":
                errorMessage = formControlName + " not in proper formate.";
                break;
            case "pattern":
                errorMessage = formControlName + " does not meet requirements.";
                break;
            default:
                errorMessage = formControlName + " does not meet requirements.";

        }
        return errorMessage;
    }



    passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('Password').value; // get password from our password form control
        const confirmPassword: string = control.get('ConfirmPassword').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('ConfirmPassword').setErrors({ NoPassswordMatch: true });
        }
    }

    patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                // if control is empty return no error
                return null;
            }

            // test the value of the control against the regexp supplied
            const valid = regex.test(control.value);

            // if true, return no error (no error), else return error passed in the second parameter
            return valid ? null : error;
        };
    }

    public getControlName(form: FormGroup, control: string) {
        return form.get(control);
    }

}