import { Component, OnInit } from '@angular/core';
import { Movie, MResponse } from '../../../services/movie.service';
import { IMovie } from '../../../services/themdb.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'mv-admin-movies',
  templateUrl: './admin-movies.component.html',
  styleUrls: ['./admin-movies.component.css']
})
export class AdminMoviesComponent implements OnInit {
  loading: boolean = false;
  moviesList: Array<IMovie> = [];

  constructor(
    private _movie: Movie,
    private _toasts: ToastsManager
  ) { }

  updateMoviesList(): void {
    this.loading = true;
    this._movie.getMovies().subscribe(res => {
      this.moviesList = res;
      this.loading = false;
    })
  }

  remove(movie: IMovie): void {
    //TODO: remove item from view without reloading the whole list
    this._movie.removeMovie(movie)
              .subscribe((res: MResponse) => {
                if(res.success) {
                  this._toasts.success(res.message);
                  let id = this.moviesList.findIndex((item, i) => item.title === movie.title);
                  this.moviesList.splice(id, 1);
                } else {
                  this._toasts.success(res.error);
                }
              })
  }

  ngOnInit() {
    this.updateMoviesList();
  }

}
