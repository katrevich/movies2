import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersComponent } from './admin-users.component';
import { SpinnerComponent } from '../../../components/common/spinner/spinner.component';
import { User } from '../../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from '../../../services/auth-interceptor.service';
import { HttpInterceptor } from '../../../services/http-interceptor.service';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { ToastsManager, ToastModule } from 'ng2-toastr/ng2-toastr';
import { RouterModule, Routes, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('AdminUsersComponent', () => {
  let component: AdminUsersComponent;
  let fixture: ComponentFixture<AdminUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminUsersComponent,
        SpinnerComponent
      ],
      imports: [
        ReactiveFormsModule,
        ToastModule.forRoot(),
        HttpModule,
        RouterModule.forRoot([]),
        NgbModule.forRoot()
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
    fixture = TestBed.createComponent(AdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
