import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../services/user.service';
import { Movie } from '../../../services/movie.service';
import { Themdb, IGenre, IMovie } from '../../../services/themdb.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'mv-search-discover',
  templateUrl: './search-discover.component.html',
  styleUrls: ['./search-discover.component.css']
})
export class SearchDiscoverComponent implements OnInit {
  loading: boolean = false;
  genres: Array<IGenre>;
  keywordsArray: Array<Object>;
  moviesList: Array<IMovie> = [];
  startYear: number = 1970;
  endYear: number = new Date().getFullYear();
  genre: Array<number> = [];
  dateStart: Date;
  years: Array<number> = [this.endYear - 1, this.endYear];
  page: number = 1;
  maxPages: number = 1;
  sortOptions: Array<Object> = [
    {value:'popularity.asc', label:"Popularity (ascending)"},
    {value:'popularity.desc', label:"Popularity (descending)"},
    {value:'release_date.asc', label:"Release date (ascending)"},
    {value:'release_date.desc', label:"Release date (descending)"},
    {value:'revenue.asc', label:"Revenue (ascending)"},
    {value:'revenue.desc', label:"Revenue (descending)"},
    {value:'primary_release_date.asc', label:"Primary release date (ascending)"},
    {value:'primary_release_date.desc', label:"Primary release date (descending)"},
    {value:'original_title.asc', label:"Original title (ascending)"},
    {value:'original_title.desc', label:"Original title (descending)"},
    {value:'vote_average.asc', label:"Vote average (ascending)"},
    {value:'vote_average.desc', label:"Vote average (descending)"},
    {value:'vote_count.asc', label:"Vote count (ascending)"},
    {value:'vote_count.desc', label:"Vote count (descending)"}
  ];
  sortBy: string = 'popularity.desc';

  rangeConfig: any = {
    behaviour: 'drag',
    connect: true,
    start: this.years,
    keyboard: true,
    step: 1,
    tooltips: [true, true],
    range: {
      min: this.startYear,
      max: this.endYear
    }
  };

  selectizeConfig: any = {
    options: this.genres
  }

  keywords: Array<Object> = [];
  cachedKeywords: Array<Object> = [];

  constructor(private _themdb: Themdb, private _user: User, private _movie: Movie, private _toasts: ToastsManager, private cdRef: ChangeDetectorRef) { }

  searchKeywords = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .distinctUntilChanged()
      .filter(item => item.length > 2)
      .switchMap(
        term => this._themdb.getKeywords(term)
                            .do((res) => {
                              this.cachedKeywords = res;
                            })
                            .map(res => res.map(item => item.name))
      )


  discoverMovies(page: number): void {
    let ids = this.keywords.map((item: any) => item.id);
    console.log(ids.join(','));
    this.loading = true;
    this._themdb.discoverMovies(this.years, this.genre.join(','), page, this.sortBy, ids.join(',')).subscribe(res => {
      this.moviesList = res.results;
      this.maxPages = res.total_pages;
      this.loading = false;
    })
  }

  addKeyword($event, input): void {
    $event.preventDefault();
    let keyword: any = this.cachedKeywords.find((item: {name, id}) => item.name === $event.item);
    this.keywords.push(keyword);
    input.value = '';
  }

  removeKeyword(keyword: any): void {
    this.keywords = this.keywords.filter((item: any) => item.id !== keyword.id);
  }

  pageChange(): void {
    this.discoverMovies(this.page);
  }

  propose(movie: IMovie): void {
    let username: string = this._user.username;
    this._movie.addMovie(movie).subscribe(res => {
      this._toasts.success(`Movie proposed: ${movie.title} by ${username}!`);
    });
  }

  populate(e: any): void {
    this._themdb.getKeywords().subscribe(res => {
      this.keywordsArray = res.map(item => {return {value: item.id, label: item.name}});
    })
  }

  ngOnInit(): void {
    this._themdb.getGenres().subscribe(res => {
      this.genres = res.map(item => {return {value: item.id, label: item.name}});
    })
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error" wtf?
    this.cdRef.detectChanges();
  }

}
