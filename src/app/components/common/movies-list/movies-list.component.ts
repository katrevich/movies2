import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from '../../../services/user.service';
import { Themdb, IMovieReview } from '../../../services/themdb.service';
import { IMovieVoted, Movie } from '../../../services/movie.service';
import { AppState } from '../../../services/app.service';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'mv-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  @Input() movies: Array<any> = [];
  @Input() voting: boolean = false;
  @Input() searching: boolean = false;
  @Output() voted: EventEmitter<any> = new EventEmitter<any>();
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _user: User,
    private _modal: NgbModal,
    private _app: AppState,
    private _themdb: Themdb,
    private _movie: Movie
  ) { }

  ngOnInit() { }

  onClick(movie: any, btn) {
    btn.style="visibility: hidden;"
    this.voted.emit(movie);
  }

  onClickVeto(movie: any) {
    this.remove.emit(movie);
  }

  open(modal): void {
    modal.open()
  }

  proposable(id: number): boolean{
    return !this._movie.movies.find(item => item.id === id)
  }

  openVideos(modal, movie: IMovieVoted): void {
    this._themdb.getVideos(movie.id)
                .subscribe(res => {
                  movie.videos = res;
                  modal.open();
                })
  }

  openReviews(modal, movie: IMovieVoted): void {
    this._themdb.getReviews(movie.id)
                .subscribe(res => {
                  movie.reviews = res;
                  modal.open();
                })
  }


}
