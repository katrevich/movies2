import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../services/user.service';
import { Movie } from '../../services/movie.service';
import { Themdb, IGenre, IMovie } from '../../services/themdb.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  genres: Array<IGenre>;
  years: Array<number> = [];
  name: string;
  moviesList: Array<IMovie>;

  constructor(private _themdb: Themdb, private _user: User, private _movie: Movie, private _toasts: ToastsManager) {
    for(let i = 1970; i <= 2018; i++){
      this.years.push(i);
    }
  }

  findMovies(): void {
    this._themdb.findMoviesByName(this.name).subscribe(res => {
      this.moviesList = res;
      console.log(this.moviesList);
    })
  }

  propose(movie: IMovie): void {
    let username: string = this._user.username;
    this._movie.addMovie(movie).subscribe(res => {
      this._toasts.success(`Movie proposed: ${movie.title} by ${username}!`);
    });
  }

  ngOnInit(): void {
    this._themdb.getGenres().subscribe(res => {
      this.genres = res;
    })
  }

}
