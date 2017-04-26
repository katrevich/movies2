import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMoviesComponent } from './admin-movies.component';
import { SpinnerComponent } from '../../../components/common/spinner/spinner.component';
import { Movie } from '../../../services/movie.service';
import { User } from '../../../services/user.service';
import { AuthInterceptor } from '../../../services/auth-interceptor.service';
import { HttpInterceptor } from '../../../services/http-interceptor.service';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { ToastsManager, ToastModule } from 'ng2-toastr/ng2-toastr';
import { RouterModule, Routes, Router } from '@angular/router';

describe('AdminMoviesComponent', () => {
  let component: AdminMoviesComponent;
  let fixture: ComponentFixture<AdminMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminMoviesComponent,
        SpinnerComponent
      ],
      imports: [
        HttpModule,
        ToastModule.forRoot(),
        RouterModule.forRoot([])
      ],
      providers: [
        Movie,
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
    fixture = TestBed.createComponent(AdminMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
