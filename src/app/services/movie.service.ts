import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthInterceptor } from './auth-interceptor.service';
import { Observable } from 'rxjs/Observable';
import { IMovie, IMovieVideo, IMovieReview } from './themdb.service';
import { User } from './user.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';

export interface MResponse {
  success: boolean;
  error?: string;
  message?: string;
}

export interface IMovieVoted extends IMovie {
  username: string;
  voters: Array<string>;
  images?: Array<string>;
  videos?: Array<IMovieVideo>;
  reviews?: Array<IMovieReview>;
}

@Injectable()
export class Movie {
  private apiUrl = 'http://localhost:3001/api';
  movies: Array<IMovieVoted> = [];

  constructor(private _http: AuthInterceptor, private _user: User){
    this.reloadMovies();
  }

  reloadMovies(){
    this._http.get(this.apiUrl + '/movies')
              .map((res: Response) => res.json())
              .subscribe(res => {
                this.movies = res;
              })
  }

  addMovie(movie: IMovie) {
    return this._http.post(this.apiUrl + '/movie', { movie, username: this._user.username })
                      .map((res: Response) => res.json())
  }

  vote(movie: IMovie) {
    return this._http.put(this.apiUrl + '/movie', { username: this._user.username, movie })
  }

  getMovies() {
    this.reloadMovies();
    return this._http.get(this.apiUrl + '/movies')
                      .map((res: Response) => res.json())
  }

  removeMovie(movie: IMovie) {
    return this._http.put(this.apiUrl + '/movies', { movie })
                    .map(res => res.json())
  }

  veto(movie: IMovie) {
    return this._http.patch(this.apiUrl + '/movie', { username: this._user.username, movie });
  }
}
