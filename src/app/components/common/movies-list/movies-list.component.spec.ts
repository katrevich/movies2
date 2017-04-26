import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListComponent } from './movies-list.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { APP_BASE_HREF } from '@angular/common';
import { User } from '../../../services/user.service';
import { AppState } from '../../../services/app.service';
import { Themdb } from '../../../services/themdb.service';
import { Movie } from '../../../services/movie.service';
import { HttpInterceptor } from '../../../services/http-interceptor.service';
import { AuthInterceptor } from '../../../services/auth-interceptor.service';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { ToastsManager, ToastModule } from 'ng2-toastr/ng2-toastr';


describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MoviesListComponent,
        ModalComponent,
        SafeUrlPipe
       ],
      imports: [
        RouterModule.forRoot([]),
        NgbModule.forRoot(),
        HttpModule,
        ToastModule.forRoot()
      ],
      providers: [
        User,
        AppState,
        Themdb,
        Movie,
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
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
