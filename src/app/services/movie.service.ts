import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthInterceptor } from './auth-interceptor.service';
import { Observable } from 'rxjs/Observable';
import { IMovie } from './themdb.service';
import { User } from './user.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class Movie {
  private apiUrl = 'http://localhost:3001/api';

  constructor(private _http: AuthInterceptor, private _user: User){ }

  addMovie(movie: IMovie) {
    return this._http.post(this.apiUrl + '/movie', { movie, username: this._user.username })
                      .map((res: Response) => res.json())
  }

  voteForMovie(movie: IMovie) {
    return this._http.put(this.apiUrl + '/movie', { movie })
  }

  getMovies() {
    return this._http.get(this.apiUrl + '/movies')
                      .map((res: Response) => res.json())
  }

  removeMovie(movie: IMovie) {
    return this._http.put(this.apiUrl + '/movies', { movie })
  }
}
