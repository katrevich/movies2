import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthInterceptor } from './auth-interceptor.service';
import { HttpInterceptor } from './http-interceptor.service';
import { Observable } from 'rxjs/Observable';
import { IMovie } from './themdb.service';
import { User } from './user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class AppState {
  private apiUrl = 'http://localhost:3001/api';
  private _voting: boolean = false;

  get voting(): boolean {
    return this._voting;
  }

  constructor(
    private _ahttp: AuthInterceptor,
    private _http: HttpInterceptor,
    private _user: User,
    private _toasts: ToastsManager
  ){
    this.getState()
  }

  getState(){
    this._http.get(`${this.apiUrl}/status`)
              .map(res => res.json().app)
              .subscribe(res => {
                this._voting = res.voting;
              })
  }

  endVoting() {
    return this._ahttp.post(`${this.apiUrl}/end`, {})
              .map(res => res.json())
  }

  restartVoting() {
    this._ahttp.post(`${this.apiUrl}/restart`, {})
              .map(res => res.json())
              .subscribe(res => {
                this.getState();
                if(res.success) {
                  this._toasts.success(res.message);
                }
              })
  }
}
