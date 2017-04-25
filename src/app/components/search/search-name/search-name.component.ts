import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../services/user.service';
import { Movie } from '../../../services/movie.service';
import { Themdb, IGenre, IMovie } from '../../../services/themdb.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'mv-search-name',
  templateUrl: './search-name.component.html',
  styleUrls: ['./search-name.component.css']
})
export class SearchNameComponent implements OnInit {
  loading: boolean = false;
  name: string;
  moviesList: Array<IMovie> = [];
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

  constructor(private _themdb: Themdb, private _user: User, private _movie: Movie, private _toasts: ToastsManager) { }

  findMovies(page: number): void {
    this.loading = true;
    this._themdb.findMoviesByName(this.name, page, this.sortBy).subscribe(res => {
      this.moviesList = res.results;
      this.maxPages = res.total_pages;
      this.loading = false;
      this._movie.reloadMovies();
    })
  }

  pageChange(): void {
    this.findMovies(this.page);
  }

  propose(movie: IMovie): void {
    let username: string = this._user.username;
    this._movie.addMovie(movie).subscribe(res => {
      this._toasts.success(`Movie proposed: ${movie.title} by ${username}!`);
    });
  }

  ngOnInit(): void {

  }

}
