import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Themdb, IMovie } from '../../services/themdb.service';
import { User } from '../../services/user.service';
import { Movie } from '../../services/movie.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss']
})
export class RelatedComponent implements OnInit {
  movie: IMovie;
  id: number;
  loading: boolean = false;
  name: string;
  moviesList: Array<IMovie> = [];
  page: number = 1;
  maxPages: number = 1;

  constructor(
    private _router: Router,
    private _aRoute: ActivatedRoute,
    private _themdb: Themdb,
    private _movie: Movie,
    private _toasts: ToastsManager,
    private _user: User
  ) { }

  findMovies(page: number): void {
    this.loading = true;
    this._themdb.getRelated(this.id.toString(), page).subscribe(res => {
      this.moviesList = res.results;
      this.maxPages = res.total_pages;
      this.loading = false;
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

  ngOnInit() {
    this._router.events.subscribe(e => {
      this.page = 1;
    })
    this._aRoute.params.subscribe(params => {
      this.id = params['id'];
      this._themdb.getMovieDetails(this.id.toString())
                  .subscribe(res => {
                    this.movie = res;
                  })
      this.findMovies(this.page);
    })
  }

}
