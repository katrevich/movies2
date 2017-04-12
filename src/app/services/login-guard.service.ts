import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from './user.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private _user: User, private _router: Router) {}

  canActivate() : boolean {
    if (!this._user.isloggedIn()){
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
