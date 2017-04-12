import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

interface IThemdbOptions {
  api_key: string;
  language: string;
  append_to_response: string;
}

export interface IGenre {
  id: string;
  name: string;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

@Injectable()
export class Themdb {
  private _dbOptions: IThemdbOptions = <IThemdbOptions>{
    api_key: 'fe408cecc08083ee7bed9c851afb8270',
    language: 'en'
  };
  private _apiUrl: string = 'https://api.themoviedb.org/3';

  constructor(private _http: Http){}

  discoverMovies(name: string){
    return this._http.get(`${this._apiUrl}/discover/movie`, {
      params: {...this._dbOptions, name}
    })
    .map((res: Response) => res.json().results , this.errorHandler)
    .catch((err: any) => this.errorHandler(err))
  }

  findMoviesByName(query: string){
    return this._http.get(`${this._apiUrl}/search/movie`, {
      params: {...this._dbOptions, query}
    })
    .map((res: Response) => res.json().results , this.errorHandler)
    .catch((err: any) => this.errorHandler(err))
  }

  getGenres(){
    return this._http.get(`${this._apiUrl}/genre/movie/list`, {
      params: this._dbOptions
    })
    .map((res: Response) => res.json().genres , this.errorHandler)
    .catch((err: any) => this.errorHandler(err))
  }

  getUpcomingMovies(){
    return this._http.get(`${this._apiUrl}/movie/upcoming`, {
      params: this._dbOptions
    })
    .map((res: Response) => res.json().results , this.errorHandler)
    .catch((err: any) => this.errorHandler(err))
  }

  errorHandler(err: any){
    console.log('Error:');
    console.log(err);
    return Observable.throw('Server error');
  }
}
