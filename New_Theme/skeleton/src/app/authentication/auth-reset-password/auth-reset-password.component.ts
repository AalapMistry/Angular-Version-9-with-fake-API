import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../authntication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss']
})
export class AuthResetPasswordComponent implements OnInit {

  emailAddress: string = "";
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!!this.emailAddress && this.emailAddress !== '') {
      this.authenticationService.validateEmail(this.emailAddress)
        .subscribe(data => {
          if (!!data && data.length >= 1) {
            //go to the forgot password page...
            this.router.navigate(['/auth/change-pass/' + data[0].id]);
          } else {
            Swal.fire('Invalid!', 'Invalid email or wrong. it is not available in system. please enter valiad email.', 'error');
          }
        });
    } else {
      Swal.fire('Required!', 'Email is required.', 'error');
    }
  }

}
