import { BrowserModule } from '@angular/platform-browser';
import '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule, ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Themdb } from './services/themdb.service';
import { User } from './services/user.service';
import { Movie } from './services/movie.service';
import { LoginGuard } from './services/login-guard.service';
import { HttpInterceptor } from './services/http-interceptor.service';
import { AuthInterceptor } from './services/auth-interceptor.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { VoteComponent } from './components/vote/vote.component';
import { NavComponent } from './components/common/nav/nav.component';
import { MoviesListComponent } from './components/common/movies-list/movies-list.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'vote', component: VoteComponent },
  { path: '', pathMatch: 'full', redirectTo: 'vote' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    VoteComponent,
    NavComponent,
    MoviesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    Themdb,
    User,
    LoginGuard,
    Movie,
    {
        provide: HttpInterceptor,
        useFactory:(backend: XHRBackend, defaultOptions: RequestOptions, toasts: ToastsManager) =>
            new HttpInterceptor(backend, defaultOptions, toasts),
        deps: [XHRBackend, RequestOptions, ToastsManager]
    },
    {
        provide: AuthInterceptor,
        useFactory:(backend: XHRBackend, defaultOptions: RequestOptions, toasts: ToastsManager) =>
            new AuthInterceptor(backend, defaultOptions, toasts),
        deps: [XHRBackend, RequestOptions, ToastsManager]
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
