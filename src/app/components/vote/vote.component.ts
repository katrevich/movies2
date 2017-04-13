import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user.service';
import { IMovie } from '../../services/themdb.service';
import { Movie } from '../../services/movie.service';

interface IMovieVoted extends IMovie {
  username: string;
  votes: number;
  voters: Array<string>;
}

@Component({
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  moviesList: Array<any>;

  constructor(private _user: User, private _movie: Movie) { }

  ngOnInit() {
    this.updateMoviesList();
  }

  updateMoviesList(): void {
    this._movie.getMovies().subscribe(res => {
      this.moviesList = res;
    })
  }

  vote(movie: IMovie): void {
    this._user.voteMade();
    this._movie.voteForMovie(movie).subscribe(res => {
      this.updateMoviesList();
    })
  }

  remove(movie: IMovie): void {
    this._user.removeMade();
    this._movie.removeMovie(movie).subscribe(res => {
      this.updateMoviesList();
    })
  }

}
