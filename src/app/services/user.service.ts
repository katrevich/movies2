import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptor } from './http-interceptor.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class User{
  private authUrl = 'http://localhost:3001/api/login';

  get username(): string {
    return localStorage.getItem('username');
  }

  get vetoed(): boolean {
    return JSON.parse(localStorage.getItem('vetoed'));
  }

  get token(): string {
    return JSON.parse(localStorage.getItem('token'));
  }

  get admin(): string {
    return JSON.parse(localStorage.getItem('admin'));
  }

  constructor(private _http: HttpInterceptor, private _router: Router){ }

  login(username: string, password: string): void {
    this._http
        .post(this.authUrl, { username, password })
        .subscribe((res: Response) => {
            if(res.json().success){
              localStorage.setItem('token', res.json().token);
              localStorage.setItem('username', res.json().username);
              localStorage.setItem('vetoed', res.json().vetoed);
              localStorage.setItem('admin', res.json().admin);
              this._router.navigate(['/search']);
            }
          }
        )
  }

  voteMade() {
    //TODO: update user in db
    console.log('vote made');
  }

  removeMade() {
    //TODO: update user in db
    console.log('remove made');
    localStorage.setItem('vetoed', "true");
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('admin');
    localStorage.removeItem('vetoed');
    this._router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
