import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptor } from './http-interceptor.service';
import { AuthInterceptor } from './auth-interceptor.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import 'rxjs/add/operator/map';

export interface IUser {
  username: string;
  password: string;
  vetoed?: boolean;
  admin?: boolean;
  token?: string;
}

@Injectable()
export class User {
  private authUrl = 'http://localhost:3001/api/login';
  private apiUrl = 'http://localhost:3001/api';

  get username(): string {
    return localStorage.getItem('username');
  }

  get vetoed(): boolean {
    return JSON.parse(localStorage.getItem('vetoed'));
  }

  get token(): string {
    return JSON.parse(localStorage.getItem('token'));
  }

  get admin(): boolean {
    return JSON.parse(localStorage.getItem('admin'));
  }

  get users(): Observable<any> {
    return this._ahttp.get(`${this.apiUrl}/users`)
                      .map((res: Response) => res.json())
  }

  // get users(): Array<string> {
  //   return
  // }

  constructor(private _http: HttpInterceptor, private _ahttp: AuthInterceptor, private _router: Router, private _toasts: ToastsManager){ }

  login(username: string, password: string): void {
    this._http
        .post(this.authUrl, { username, password })
        .subscribe((res: Response) => {
            if(res.json().success){
              this.setUser(res.json());
              this._router.navigate(['/search']);
            }
          }
        )
  }

  veto(): void {
    this._http.put(this.apiUrl + 'user', { username: this.username })
              .subscribe((res: Response) => {
                if(res.json().success){
                  this.setUser(res.json().user);
                  this._toasts.success(res.json().message);
                }
              })
  }

  onVote() {
    //TODO: update user in db
    console.log('vote made');
  }

  onVeto() {
    //TODO: update user in db
    console.log('veto made');
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

  setUser(user: IUser): void {
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.username);
    localStorage.setItem('vetoed', JSON.stringify(user.vetoed));
    localStorage.setItem('admin', JSON.stringify(user.admin));
  }

  removeUser(user: IUser): Observable<any> {
    return this._ahttp.put(`${this.apiUrl}/users`, { user })
              .map((res: Response) => res.json())
  }

  updateUser(user: IUser): Observable<any> {
    return this._ahttp.put(`${this.apiUrl}/user`, { user })
              .map((res: Response) => res.json())
  }

  register(user: IUser): Observable<any> {
    return this._ahttp.post(`${this.apiUrl}/register`, { user })
              .map((res: Response) => res.json())
  }
}
