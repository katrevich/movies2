import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGeneralComponent } from './admin-general.component';
import { AppState } from '../../../services/app.service';
import { ToastsManager, ToastModule } from 'ng2-toastr/ng2-toastr';
import { AuthInterceptor } from '../../../services/auth-interceptor.service';
import { HttpInterceptor } from '../../../services/http-interceptor.service';
import { User } from '../../../services/user.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

describe('AdminGeneralComponent', () => {
  let component: AdminGeneralComponent;
  let fixture: ComponentFixture<AdminGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminGeneralComponent
      ],
      imports: [
        ToastModule.forRoot(),
        HttpModule,
        RouterModule.forRoot([])
      ],
      providers: [
        AppState,
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
    fixture = TestBed.createComponent(AdminGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
