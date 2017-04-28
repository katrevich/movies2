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
  private apiUrl = 'http://localhost:3001/api';
  private user: IUser = <IUser>{};

  get username(): string {
    return this.user.username;
  }

  get vetoed(): boolean {
    return this.user.vetoed;
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  get admin(): boolean {
    return this.user.admin;
  }

  get users(): Observable<any> {
    return this._ahttp.get(`${this.apiUrl}/users`)
                      .map((res: Response) => res.json())
  }

  constructor(private _http: HttpInterceptor, private _ahttp: AuthInterceptor, private _router: Router, private _toasts: ToastsManager){
    let token = localStorage.getItem('token');
    if(token) {
      this._ahttp.get(`${this.apiUrl}/user`)
      .map((res: Response) => res.json())
      .subscribe(user => {
        this.setUser(user);
      })
    }

  }

  login(username: string, password: string): void {
    this._http
        .post(`${this.apiUrl}/login`, { username, password })
        .subscribe((res: Response) => {
            if(res.json().success){
              this.setUser(res.json());
              this._router.navigate(['/propose']);
            }
          }
        )
  }

  veto(): void {
    this.user.vetoed = true;
  }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  setUser(user): void {
    this.user.username = user.username;
    this.user.vetoed = user.vetoed;
    this.user.admin = user.admin;
    localStorage.setItem('token', user.token);
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
