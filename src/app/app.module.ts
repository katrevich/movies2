import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Themdb } from './services/themdb.service';
import { User } from './services/user.service';
import { LoginGuard } from './services/login-guard.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { VoteComponent } from './components/vote/vote.component';
import { NavComponent } from './components/common/nav/nav.component';

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
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [ Themdb, User, LoginGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
