import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { NavComponent } from '../../components/common/nav/nav.component';
import { AdminGeneralComponent } from './admin-general/admin-general.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminMoviesComponent } from './admin-movies/admin-movies.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from '../../components/common/spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../services/user.service';
import { AppState } from '../../services/app.service';
import { ToastsManager, ToastModule } from 'ng2-toastr/ng2-toastr';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpInterceptor } from '../../services/http-interceptor.service';
import { AuthInterceptor } from '../../services/auth-interceptor.service';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';


describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminComponent,
        NavComponent,
        AdminGeneralComponent,
        AdminUsersComponent,
        AdminMoviesComponent,
        SpinnerComponent
      ],
      imports: [
        NgbModule.forRoot(),
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        HttpModule,
        ToastModule.forRoot()
      ],
      providers: [
        User,
        AppState,
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
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
