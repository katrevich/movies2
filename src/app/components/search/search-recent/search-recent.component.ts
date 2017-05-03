import { Component, OnInit } from '@angular/core';
import { Themdb, IGenre, IMovie } from '../../../services/themdb.service';
import { User } from '../../../services/user.service';
import { Movie } from '../../../services/movie.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'mv-search-recent',
  templateUrl: './search-recent.component.html',
  styleUrls: ['./search-recent.component.css']
})
export class SearchRecentComponent implements OnInit {
  page: number = 1;
  moviesList: Array<IMovie> = [];
  loading: boolean = false;

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

  ngOnInit() {
    this._themdb.getUpcomingMovies()
                .subscribe(res => {
                  this.moviesList = res;
                  this._movie.reloadMovies();
                })
  }

}
