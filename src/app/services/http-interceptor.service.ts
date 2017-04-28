import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Request , Headers, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

export function HttpInterceptorFactory(backend: XHRBackend, defaultOptions: RequestOptions, toasts: ToastsManager) {
  return new HttpInterceptor(backend, defaultOptions, toasts)
}

@Injectable()
export class HttpInterceptor extends Http {
  private _url: string | Request;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _toasts: ToastsManager) {
    super(backend, defaultOptions);
  }

  request(url: Request, options?: RequestOptionsArgs): Observable<Response>{
    return super.request(url, options).catch(this.catchError(this))
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this._url = url;
    return super.get(url, options).catch(this.catchError(this));
  }

  private catchError (self: HttpInterceptor) {
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
