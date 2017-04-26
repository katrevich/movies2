import { TestBed, inject } from '@angular/core/testing';

import { Themdb } from './themdb.service';
import { HttpModule, ConnectionBackend, XHRBackend, RequestOptions } from '@angular/http';
import { ToastModule, ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RouterModule, Routes, Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpInterceptor } from './http-interceptor.service';
import { AuthInterceptor } from './auth-interceptor.service';
import { User } from './user.service';

describe('ThemdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ToastModule.forRoot(),
        RouterModule.forRoot([])
      ],
      providers: [
        User,
        Themdb,
        AuthInterceptor,
        ConnectionBackend,
        {provide: APP_BASE_HREF, useValue: '/'},
        {
            provide: HttpInterceptor,
            useFactory:(backend: XHRBackend, defaultOptions: RequestOptions, toasts: ToastsManager) =>
                new HttpInterceptor(backend, defaultOptions, toasts),
            deps: [XHRBackend, RequestOptions, ToastsManager]
        },
        {
            provide: AuthInterceptor,
            useFactory:(backend: XHRBackend, defaultOptions: RequestOptions, toasts: ToastsManager, router: Router) =>
                new AuthInterceptor(backend, defaultOptions, toasts, router),
            deps: [XHRBackend, RequestOptions, ToastsManager, Router]
        }
      ]
    });
  });

  it('should ...', inject([Themdb], (service: Themdb) => {
    expect(service).toBeTruthy();
  }));
});
