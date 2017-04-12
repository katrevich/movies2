import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Themdb, IGenre, IMovie } from '../../services/themdb.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  genres: Array<IGenre>;
  years: Array<number> = [];
  name: string;
  moviesList: Array<IMovie>;

  constructor(private _themdb: Themdb) {
    for(let i = 1970; i <= 2018; i++){
      this.years.push(i);
    }
  }

  findMovies() {
    this._themdb.findMoviesByName(this.name).subscribe(res => {
      this.moviesList = res;
      console.log(this.moviesList);
    })
  }

  ngOnInit(): void {
    this._themdb.getGenres().subscribe(res => {
      this.genres = res;
    })
  }

}
