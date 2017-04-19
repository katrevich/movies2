import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../services/user.service';
import { Movie } from '../../../services/movie.service';
import { Themdb, IGenre, IMovie } from '../../../services/themdb.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'mv-search-discover',
  templateUrl: './search-discover.component.html',
  styleUrls: ['./search-discover.component.css']
})
export class SearchDiscoverComponent implements OnInit {
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
    {value:'popularity.asc', label:"popularity.asc"},
    {value:'popularity.desc', label:"popularity.desc"},
    {value:'release_date.asc', label:"release_date.asc"},
    {value:'release_date.desc', label:"release_date.desc"},
    {value:'revenue.asc', label:"revenue.asc"},
    {value:'revenue.desc', label:"revenue.desc"},
    {value:'primary_release_date.asc', label:"primary_release_date.asc"},
    {value:'primary_release_date.desc', label:"primary_release_date.desc"},
    {value:'original_title.asc', label:"original_title.asc"},
    {value:'original_title.desc', label:"original_title.desc"},
    {value:'vote_average.asc', label:"vote_average.asc"},
    {value:'vote_average.desc', label:"vote_average.desc"},
    {value:'vote_count.asc', label:"vote_count.asc"},
    {value:'vote_count.desc', label: "vote_count.desc"}
  ];
  sortBy: string;

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

  keywords: Array<number> = [];

  constructor(private _themdb: Themdb, private _user: User, private _movie: Movie, private _toasts: ToastsManager, private cdRef: ChangeDetectorRef) { }

  discoverMovies(page: number): void {
    this._themdb.discoverMovies(this.years, this.genre.join(','), page, this.sortBy, this.keywords.join(',')).subscribe(res => {
      this.moviesList = res.results;
      this.maxPages = res.total_pages;
    })
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
    console.log(e);
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
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

}
