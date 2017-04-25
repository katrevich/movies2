import { Component, OnInit } from '@angular/core';
import { Themdb, IGenre, IMovie } from '../../../services/themdb.service';
import { User } from '../../../services/user.service';
import { Movie } from '../../../services/movie.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'mv-search-top',
  templateUrl: './search-top.component.html',
  styleUrls: ['./search-top.component.css']
})
export class SearchTopComponent implements OnInit {
  page: number = 1;
  maxPages: number = 1;
  moviesList: Array<IMovie> = [];

  constructor(
    private _themdb: Themdb,
    private _user: User,
    private _movie: Movie,
    private _toasts: ToastsManager
  ) { }

  propose(movie: IMovie): void {
    let username: string = this._user.username;
    this._movie.addMovie(movie).subscribe(res => {
      this._toasts.success(`Movie proposed: ${movie.title} by ${username}!`);
    });
  }

  getMovies(page: number): void {
    this._themdb.getTopRated(page)
                .subscribe(res => {
                  this.moviesList = res.results;
                  this.maxPages = res.total_pages;
                  this._movie.reloadMovies();
                })
  }

  ngOnInit() {
    this.getMovies(this.page);
  }

  pageChange(): void {
    this.getMovies(this.page);
  }

}
