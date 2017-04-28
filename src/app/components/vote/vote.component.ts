import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user.service';
import { IMovie } from '../../services/themdb.service';
import { Movie, IMovieVoted } from '../../services/movie.service';
import { AppState } from '../../services/app.service';

@Component({
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  moviesList: Array<IMovieVoted> = [];
  winner: any;
  loading: boolean = false;
  hideMy: boolean = false;

  constructor(
    private _user: User,
    private _movie: Movie,
    private _app: AppState
  ) { }

  ngOnInit() {
    this.updateMoviesList();
  }

  /**
  * Reload list of movies proposed for viewing.
  */
  updateMoviesList(): void {
    this.loading = true;
    this._movie.getMovies().subscribe(res => {
      this.moviesList = res;
      this.loading = false;
      if(!this._app.voting && this.moviesList.length){
        this.winner = this.getWinner(this.moviesList);
      }
    })
  }

  /**
  * Voting for a movie. Adding to the arrey of users voted for a movie.
  * @param {movie} IMovieVoted
  */
  vote(movie: IMovie): void {
    this._movie.vote(movie).subscribe(res => {
      // this.updateMoviesList();
    })
  }

  /**
  * Vetoing a movie (every user has one right to veto).
  * Vetoed movie is not removed, but can't be voted for.
  * @param {movie} IMovieVoted
  */
  veto(movie: IMovie): void {
    this._movie.veto(movie).subscribe(res => {
      // this.updateMoviesList();
    })
  }

  /**
  * Deciding on the winner, currently it's the one that has max amount of votes
  * and max user rating
  * @param {movies} Array<IMovieVoted>
  * @returns {movie} IMovieVoted
  */
  getWinner(movies: Array<IMovieVoted>): any {
    let maxItem = this.moviesList[0],
        maxRating,
        winner,
        maxArray = [];

    this.moviesList.forEach(item => {
      if(item.voters.length > maxItem.voters.length) {
        maxItem = item;
      }
    })

    this.moviesList.forEach(item => {
      if(item.voters.length === maxItem.voters.length) {
        maxArray.push(item);
      }
    })

    maxRating = maxArray[0].vote_average;
    winner = maxArray[0];
    maxArray.forEach(item => {
      if(item.vote_average > maxRating.vote_average) {
        winner = item;
      }
    })

    return winner;
  }
}
