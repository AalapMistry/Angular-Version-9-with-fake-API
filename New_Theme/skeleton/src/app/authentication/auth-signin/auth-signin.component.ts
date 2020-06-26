import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../authentication.class';
import { AuthenticationService } from '../authntication.service';
import { Router } from '@angular/router';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { UserModel } from 'src/app/users/user.class';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  loginModel: LoginModel = new LoginModel();

  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    
  }

  onSubmit(form) {
    this.authenticationService.validateUser(this.loginModel.UserName, this.loginModel.Password)
      .subscribe(data => {
        if (!!data && data.length >= 1) {
          this.afterLoginStuff(data[0]);
        } else {
          Swal.fire('Invalid!', 'invalid email or password.', 'error');
        }
      });
  }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
      let gUser: UserModel = new UserModel();
      gUser.EmailAddress = x.email;
      gUser.FirstName = x.firstName;
      gUser.LastName = x.lastName;
      gUser.Password = x.id;
      gUser.ProfileImage = x.photoUrl;
      gUser.IsActive = true;

      this.authenticationService.validateEmail(gUser.EmailAddress)
        .subscribe(data => {
          if (!!data && data.length >= 1) {
            this.afterLoginStuff(data[0]);
          } else {
            this.insertRecord(gUser);
          }
        });
      console.log(x)
    });
  }

  insertRecord(data: UserModel) {
    this.authenticationService.insert(data)
      .subscribe(data => {
        if (!!data) {
          this.afterLoginStuff(data);
        }
      });
  }

  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(x => {
        let gUser: UserModel = new UserModel();
        gUser.EmailAddress = x.email;
        gUser.FirstName = x.firstName;
        gUser.LastName = x.lastName;
        gUser.Password = x.id;
        gUser.ProfileImage = x.photoUrl;
        gUser.IsActive = true;
        this.authenticationService.validateEmail(gUser.EmailAddress)
          .subscribe(data => {
            if (!!data && data.length >= 1) {
              this.afterLoginStuff(data[0]);
            } else {
              this.insertRecord(gUser);
            }
          });
        console.log(x)

      });

  }


  private afterLoginStuff = (data: UserModel | any) => {
    localStorage.setItem("IsLoggedIn", "true");
    localStorage.setItem("LoggedUserDetails", JSON.stringify(data));
    this.router.navigate(['/dashboard/project']);
  }

}
