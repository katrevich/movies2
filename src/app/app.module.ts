import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Themdb } from './services/themdb.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { VoteComponent } from './components/vote/vote.component';
import { NavComponent } from './components/common/nav/nav.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'vote', component: VoteComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
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
    RouterModule.forRoot(routes)
  ],
  providers: [Themdb],
  bootstrap: [AppComponent]
})
export class AppModule { }
