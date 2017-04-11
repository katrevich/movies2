import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

interface IThemdbOptions {
  apiKey: string;
  language: string;
}

@Injectable()
export class Themdb {
  private _dbOptions: IThemdbOptions = <IThemdbOptions>{
    apiKey: 'fe408cecc08083ee7bed9c851afb8270',
    language: 'en'
  };
  private _apiUrl: string = 'https://api.themoviedb.org/3';

  constructor(private _http: Http){}

  discoverMovies(name: string){
    return this._http.get(`${this._apiUrl}/discover/movie`, {
      params: {...this._dbOptions, name}
    })
    .map((res: Response) => res.json().data.results , this.errorHandler)
    .catch((err: any) => this.errorHandler(err))
  }

  findMoviesByName(query: string){
    return this._http.get(`${this._apiUrl}/search/movie`, {
      params: {...this._dbOptions, query}
    })
    .map((res: Response) => res.json().data.results , this.errorHandler)
    .catch((err: any) => this.errorHandler(err))
  }

  getGenres(){
    return this._http.get(`${this._apiUrl}/genre/movie/list`, {
      params: this._dbOptions
    })
    .map((res: Response) => res.json().data.genres , this.errorHandler)
    .catch((err: any) => this.errorHandler(err))
  }

  getUpcomingMovies(){
    return this._http.get(`${this._apiUrl}/movie/upcoming`, {
      params: this._dbOptions
    })
    .map((res: Response) => res.json().data.results , this.errorHandler)
    .catch((err: any) => this.errorHandler(err))
  }

  errorHandler(err: any){
    return Observable.throw(err.json().error || 'Server error');
  }
}
