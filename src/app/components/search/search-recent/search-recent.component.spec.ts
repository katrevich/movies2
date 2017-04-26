import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRecentComponent } from './search-recent.component';
import { User } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpInterceptor } from '../../../services/http-interceptor.service';
import { AuthInterceptor } from '../../../services/auth-interceptor.service';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { ToastsManager, ToastModule } from 'ng2-toastr/ng2-toastr';
import { NavComponent } from '../../../components/common/nav/nav.component';
import { MoviesListComponent } from '../../../components/common/movies-list/movies-list.component';
import { SpinnerComponent } from '../../../components/common/spinner/spinner.component';
import { ModalComponent } from '../../../components/common/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { Themdb } from '../../../services/themdb.service';
import { Movie } from '../../../services/movie.service';
import { AppState } from '../../../services/app.service';
import { NouisliderModule } from 'ng2-nouislider';
import { SelectModule } from 'angular2-select';

describe('SearchRecentComponent', () => {
  let component: SearchRecentComponent;
  let fixture: ComponentFixture<SearchRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchRecentComponent,
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
        NgbModule.forRoot(),
        NouisliderModule,
        SelectModule,
        FormsModule
      ],
      providers: [
        User,
        Themdb,
        Movie,
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
    fixture = TestBed.createComponent(SearchRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
