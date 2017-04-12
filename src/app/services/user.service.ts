import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class User{
  private logginedIn = true;
  private authUrl = 'http://demo2841767.mockable.io/auth';

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
            this.logginedIn = true;
            this._router.navigate(['/search']);
          },
          (err: any) => {
            console.log('Errors: ');
            console.log(err);
          }
        )
}

  logout(): void {
    localStorage.removeItem('token');
    this.logginedIn = false;
  }

  isloggedIn(): boolean {
    return this.logginedIn;
  }
}
