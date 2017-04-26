import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { User } from '../../services/user.service';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpInterceptor } from '../../services/http-interceptor.service';
import { AuthInterceptor } from '../../services/auth-interceptor.service';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { ToastsManager, ToastModule } from 'ng2-toastr/ng2-toastr';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      imports: [
        ToastModule.forRoot(),
        HttpModule,
        RouterModule.forRoot([])
      ],
      providers: [
        User,
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
