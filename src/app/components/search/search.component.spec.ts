import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { User } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
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
import { AppState } from '../../services/app.service';
import { NouisliderModule } from 'ng2-nouislider';
import { SelectModule } from 'angular2-select';

import { SearchDiscoverComponent } from '../../components/search/search-discover/search-discover.component';
import { SearchNameComponent } from '../../components/search/search-name/search-name.component';
import { SearchRecentComponent } from '../../components/search/search-recent/search-recent.component';
import { SearchTopComponent } from '../../components/search/search-top/search-top.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        NavComponent,
        MoviesListComponent,
        SpinnerComponent,
        ModalComponent,
        SafeUrlPipe,
        SearchDiscoverComponent,
        SearchNameComponent,
        SearchRecentComponent,
        SearchTopComponent
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
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
