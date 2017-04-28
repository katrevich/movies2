import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Request , Headers, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

export function AuthInterceptorFactory(backend: XHRBackend, defaultOptions: RequestOptions, toasts: ToastsManager, router: Router) {
  return new AuthInterceptor(backend, defaultOptions, toasts, router)
}

@Injectable()
export class AuthInterceptor extends Http {
  private _url: string | Request;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _toasts: ToastsManager, private _router: Router) {
    super(backend, defaultOptions);
  }

  request(url: Request, options?: RequestOptionsArgs): Observable<Response>{
    let token = localStorage.getItem('token');

    if (typeof url === 'string') {
      if (!options) {
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', token);
    } else {
      url.headers.set('Authorization', token);
    }
    return super.request(url, options).catch(this.catchError(this))
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this._url = url;
    return super.get(url, options).catch(this.catchError(this));
  }

  private catchError (self: AuthInterceptor) {
    return (res: Response) => {
      // this._toasts.error('Error: ' + this._url + res.status);

      if(res.status == 498) {
        this._router.navigate(['/logout']);
      }

      this._toasts.error(`Error:
        ${res.status}
        ${res.json().error}
        `);
      return Observable.throw(res);
    };
  }
}
