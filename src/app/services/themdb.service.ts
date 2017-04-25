import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptor } from './http-interceptor.service';
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
  genre_ids: Array<number>;
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
  veto: boolean;
}

export interface IMovieReview {
  id: string;
  author: string;
  content: string;
  url: string;
}

export interface IMovieVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

@Injectable()
export class Themdb {
  private _dbOptions: IThemdbOptions = <IThemdbOptions>{
    api_key: 'fe408cecc08083ee7bed9c851afb8270',
    language: 'en'
  };
  private _apiUrl: string = 'https://api.themoviedb.org/3';

  constructor(private _http: HttpInterceptor){}

  discoverMovies(years: Array<number>, genres: string, page: number = 1, sort_by: string = 'popularity.desc', keywords: string = ''){
    return this._http.get(`${this._apiUrl}/discover/movie`, {
      params: {
        ...this._dbOptions,
        "primary_release_date.gte": years[0] + '-01-01',
        "primary_release_date.lte": years[1] + '-01-01',
        with_genres: genres,
        with_keywords: keywords,
        page,
        sort_by
      }
    })
    .map((res: Response) => res.json())
  }

  findMoviesByName(query: string, page: number = 1, sort_by: string = 'popularity.desc'){
    return this._http.get(`${this._apiUrl}/search/movie`, {
      params: {...this._dbOptions, query, page, sort_by}
    })
    .map((res: Response) => res.json())
  }

  getGenres(){
    return this._http.get(`${this._apiUrl}/genre/movie/list`, {
      params: this._dbOptions
    })
    .map((res: Response) => res.json().genres)
  }

  getKeywords(query: string = 'a'){
    return this._http.get(`${this._apiUrl}/search/keyword`, {
      params: {
        ...this._dbOptions,
        query
      }
    })
    .map((res: Response) => res.json().results)
  }

  getUpcomingMovies(){
    return this._http.get(`${this._apiUrl}/movie/upcoming`, {
      params: this._dbOptions
    })
    .map((res: Response) => res.json().results)
  }

  getTopRated(page: number){
    return this._http.get(`${this._apiUrl}/movie/top_rated`, {
      params: {...this._dbOptions, page}
    })
    .map((res: Response) => res.json())
  }

  getVideos(id: string){
    return this._http.get(`${this._apiUrl}/movie/${id}/videos`, {
      params: this._dbOptions
    })
    .map((res: Response) => res.json().results)
  }

  getReviews(id: string){
    return this._http.get(`${this._apiUrl}/movie/${id}/reviews`, {
      params: this._dbOptions
    })
    .map((res: Response) => res.json().results)
  }

  getRelated(id: string, page: number){
    return this._http.get(`${this._apiUrl}/movie/${id}/similar`, {
      params: {...this._dbOptions, page}
    })
    .map((res: Response) => res.json())
  }

  getMovieDetails(id: string){
    return this._http.get(`${this._apiUrl}/movie/${id}`, {
      params: this._dbOptions
    })
    .map((res: Response) => res.json())
  }
}
