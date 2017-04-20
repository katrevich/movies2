import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../services/user.service';

@Component({
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private _user: User, private _router: Router) { }

  ngOnInit() {
    this._user.logout();
    this._router.navigate(['/login']);
  }

}
