import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user.service';
import { IMovie } from '../../services/themdb.service';
import { Movie } from '../../services/movie.service';
import { AppState } from '../../services/app.service';

interface IMovieVoted extends IMovie {
  username: string;
  voters: Array<string>;
}

@Component({
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  moviesList: Array<IMovieVoted> = [];
  winner: any;
  loading: boolean = false;

  constructor(
    private _user: User,
    private _movie: Movie,
    private _app: AppState
  ) { }

  ngOnInit() {
    this.updateMoviesList();
  }

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

  vote(movie: IMovie): void {
    this._user.onVote();
    this._movie.vote(movie).subscribe(res => {
      this.updateMoviesList();
    })
  }

  veto(movie: IMovie): void {
    this._user.onVeto();
    this._movie.veto(movie).subscribe(res => {
      this.updateMoviesList();
    })
  }

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
