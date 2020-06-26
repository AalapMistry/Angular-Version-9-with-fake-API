import { Component, OnInit } from '@angular/core';
import { ChangePasswordModel } from '../authentication.class';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/users/user.class';
import { AuthenticationService } from '../authntication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-change-password',
  templateUrl: './auth-change-password.component.html',
  styleUrls: ['./auth-change-password.component.scss']
})
export class AuthChangePasswordComponent implements OnInit {

  changePassModel = new ChangePasswordModel();
  hide: boolean = true;
  userDetails = new UserModel();

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private toaster: ToastrService,
    private router: Router

  ) { }

  ngOnInit() {
    this.initUserData();
  }

  initUserData = () => {
    this.activatedRoute.data.subscribe(res => {
      if (!!res && !!res.userData) {
        this.userDetails = res.userData[0];
      }
    });
  }

  onSubmit() {
    if (this.changePassModel.Password !== this.changePassModel.ConfirmPassword) {
      Swal.fire("Password does not match");
    } else {
      Object.assign(this.userDetails, this.changePassModel);
      this.authenticationService.updateRecord(this.userDetails)
        .subscribe(data => {
          if (!!data) {
            this.toaster.success("Password changed successfully.", "Success");
            this.router.navigate(['/']);
          }
        });
    }
  }

}
