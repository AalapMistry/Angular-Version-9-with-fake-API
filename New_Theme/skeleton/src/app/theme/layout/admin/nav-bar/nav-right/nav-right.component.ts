import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserChangePasswordComponent } from 'src/app/user-change-password/user-change-password.component';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  constructor(private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() { }
  logout() {
    localStorage.clear(); this.router.navigate(['/']);
  }
  gotoProfile() {
    if (!!localStorage.getItem("LoggedUserDetails")) {
      let user = JSON.parse(localStorage.getItem("LoggedUserDetails"));
      this.router.navigate(['/user-list/user-profile', { id: user.id }]);
    }
  }
  gotChangePassword() {
    if (!!localStorage.getItem("LoggedUserDetails")) {
      this.modalService.open(UserChangePasswordComponent).result.then((result) => {
      }, (reason) => {
      });
    }
  }
}
