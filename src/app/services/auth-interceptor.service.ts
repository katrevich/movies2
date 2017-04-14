import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Request , Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class AuthInterceptor extends Http {
  private _url: string | Request;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _toasts: ToastsManager) {
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
      this._toasts.error(`Error:
        ${this._url}
        ${res.status}
        ${res.json().error}
        `);
      return Observable.throw(res);
    };
  }
}
