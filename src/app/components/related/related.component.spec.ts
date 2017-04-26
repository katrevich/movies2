import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedComponent } from './related.component';
import { User } from '../../services/user.service';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpInterceptor } from '../../services/http-interceptor.service';
import { AuthInterceptor } from '../../services/auth-interceptor.service';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { ToastsManager, ToastModule } from 'ng2-toastr/ng2-toastr';
import { NavComponent } from '../../components/common/nav/nav.component';
import { MoviesListComponent } from '../../components/common/movies-list/movies-list.component';
import { SpinnerComponent } from '../../components/common/spinner/spinner.component';
import { ModalComponent } from '../../components/common/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { Themdb } from '../../services/themdb.service';
import { Movie } from '../../services/movie.service';

describe('RelatedComponent', () => {
  let component: RelatedComponent;
  let fixture: ComponentFixture<RelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RelatedComponent,
        NavComponent,
        MoviesListComponent,
        SpinnerComponent,
        ModalComponent,
        SafeUrlPipe
       ],
      imports: [
        ToastModule.forRoot(),
        HttpModule,
        RouterModule.forRoot([]),
        NgbModule.forRoot()
      ],
      providers: [
        User,
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
    fixture = TestBed.createComponent(RelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
