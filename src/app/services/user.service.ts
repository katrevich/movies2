import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class User{
  private logginedIn = true;
  private authUrl = 'http://demo2841767.mockable.io/auth';

  get username(): string {
    return localStorage.getItem('username');
  }

  get voted(): boolean {
    return JSON.parse(localStorage.getItem('voted'));
  }

  get removed(): boolean {
    return JSON.parse(localStorage.getItem('removed'));
  }

  constructor(private _http: Http, private _router: Router){
    if(localStorage.getItem('token') === null) {
      this.logginedIn = false;
    }
  }

  login(username: string, password: string): void {
    this._http
        .post(this.authUrl, { username, password })
        .subscribe((res: Response) => {
            localStorage.setItem('token', res.json().token);
            localStorage.setItem('username', res.json().username);
            localStorage.setItem('voted', res.json().voted);
            localStorage.setItem('removed', res.json().voted);
            this.logginedIn = true;
            this._router.navigate(['/search']);
          },
          (err: any) => {
            console.log('Errors: ');
            console.log(err);
          }
        )
  }

  voteMade() {
    //TODO: update user in db
    console.log('vote made');
    localStorage.setItem('voted', "true");
  }

  removeMade() {
    //TODO: update user in db
    console.log('remove made');
    localStorage.setItem('removed', "true");
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('voted');
    localStorage.removeItem('removed');
    this.logginedIn = false;
    this._router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.logginedIn;
  }
}
