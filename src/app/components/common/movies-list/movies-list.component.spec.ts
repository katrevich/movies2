import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListComponent } from './movies-list.component';
import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { APP_BASE_HREF } from '@angular/common';
import { User } from '../../../services/user.service';
import { AppState } from '../../../services/app.service';
import { Themdb } from '../../../services/themdb.service';
import { Movie, IMovieVoted } from '../../../services/movie.service';
import { HttpInterceptor } from '../../../services/http-interceptor.service';
import { AuthInterceptor } from '../../../services/auth-interceptor.service';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { ToastsManager, ToastModule } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const movies = [{
  poster_path:'/nORMXEkYEbzkU5WkMWMgRDJwjSZ.jpg',
  adult:false,
  overview:'When Ripleys lifepod is found by a salvage crew over 50 years later, she finds that terra-formers are on the very planet they found the alien species. When the company sends a family of colonists out to investigate her story, all contact is lost with the planet and colonists. They enlist Ripley and the colonial marines to return and search for answers.',
  release_date:'1986-07-18',
  id:679,
  original_title:'Aliens',
  original_language:'en',
  title:'Aliens',
  backdrop_path:'/r2zB2vGLDQVxlRZISH7KzQ6reiC.jpg',
  popularity:5.559436,
  vote_count:2634,
  video:false,
  vote_average:7.7,
  username:'admin',
  veto:false,
  voters:['admin'],
  votes:0,
  genre_ids:[27,28,53,878]
}];

const reviews = [
  {
    id: '1',
    author: 'author',
    content: 'review',
    url: 'url'
  },
  {
    id: '2',
    author: 'author2',
    content: 'review2',
    url: 'url2'
  }
];

const videos = [
  {
    id: '1',
    iso_639_1: '1',
    iso_3166_1: '1',
    key: 'key',
    name: 'video name',
    site: 'video site',
    size: 10,
    type: 'video type'
  },
  {
    id: '2',
    iso_639_1: '1',
    iso_3166_1: '1',
    key: 'key',
    name: 'video name',
    site: 'video site',
    size: 10,
    type: 'video type'
  }
];

@Component({
  selector: 'mv-wrap-component',
  template: `<mv-movies-list [searching]="true" [movies]="movies" (voted)="propose($event)" (veto)="veto($event)" [voting]="true" [hideMy]="true"></mv-movies-list>`
})
class WrapperComponent {
  movies = movies;
  propose(){ }
  veto() { }
}

class MovieServiceMock {
  public movies = movies;
}

class ThemdbServiceMock {
  getReviews(){
    return Observable.of(reviews);
  }

  getVideos(){
    return Observable.of(videos);
  }
}

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WrapperComponent,
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
        {provide: Movie, useClass: MovieServiceMock},
        {provide: Themdb, useClass: ThemdbServiceMock},
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
    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get movies list', () => {
    expect(component.movies).toEqual(movies);
  });

  it('should get voting mode', () => {
    expect(component.voting).toEqual(true);
  });

  it('should get searching mode', () => {
    expect(component.searching).toEqual(true);
  });

  it('should emit user vote', () => {
    spyOn(component.voted, 'emit');
    component.emitVote('', document.createElement('button'));
    fixture.detectChanges();
    expect(component.voted.emit).toHaveBeenCalled();
  });

  it('should hide vote button', () => {
    let button = document.createElement('button');
    component.emitVote('', button);
    fixture.detectChanges();
    expect(button.className).toBe('hidden');
  });

  it('should emit user veto', () => {
    spyOn(component.veto, 'emit');
    component.emitVeto(movies[0], document.createElement('button'));
    fixture.detectChanges();
    expect(component.veto.emit).toHaveBeenCalled();
  });

  it('should hide veto button', () => {
    let button = document.createElement('button');
    component.emitVeto({veto: false}, button);
    fixture.detectChanges();
    expect(button.className).toBe('hidden');
  });

  it('should show if movie proposable', () => {
    expect(component.proposable(movies[0].id)).toBe(false);
  });

  it('should show movie reviews', () => {
    spyOn(component.reviewsModal, 'open');
    component.openReviews(<IMovieVoted>movies[0]);
    fixture.detectChanges();
    expect(component.reviewsModal.open).toHaveBeenCalled();
  })

  it('should show movie videos', () => {
    spyOn(component.videosModal, 'open');
    component.openVideos(<IMovieVoted>movies[0]);
    fixture.detectChanges();
    expect(component.videosModal.open).toHaveBeenCalled();
  })
});
