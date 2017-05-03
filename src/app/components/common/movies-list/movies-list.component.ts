import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from '../../../services/user.service';
import { Themdb, IMovieReview } from '../../../services/themdb.service';
import { IMovieVoted, Movie } from '../../../services/movie.service';
import { AppState } from '../../../services/app.service';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { state, transition, style, animate, trigger } from '@angular/animations';

@Component({
  selector: 'mv-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  animations: [
    trigger('card', [
      state('fadeIn', style({
        opacity: '1',
        transform: 'scale(1)'
      })),
      transition('void => *', [
        style({
          opacity: '0',
          transform: 'scale(.8)'
        }),
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class MoviesListComponent implements OnInit {
  @Input() movies: Array<IMovieVoted> = [];
  @Input() voting: boolean = false;
  @Input() searching: boolean = false;
  @Input() hideMy: boolean = false;
  @Output() voted: EventEmitter<any> = new EventEmitter<any>();
  @Output() veto: EventEmitter<any> = new EventEmitter<any>();
  @Output() propose: EventEmitter<any> = new EventEmitter<any>();
  public modalMovie:IMovieVoted = <IMovieVoted>{};
  public relatedMovies: Array<IMovieVoted> = [];

  @ViewChild('videos') videosModal: ModalComponent;
  @ViewChild('reviews') reviewsModal: ModalComponent;
  @ViewChild('related') relatedModal: ModalComponent;

  state: string = 'fadeIn';

  constructor(
    private _user: User,
    private _modal: NgbModal,
    private _app: AppState,
    private _themdb: Themdb,
    public movie: Movie
  ) { }

  ngOnInit() {

  }

  emitVote(movie: any, btn): void {
    btn.className="hidden";
    this.voted.emit(movie);
  }

  emitPropose(movie: any, btn): void {
    btn.className="hidden";
    this.propose.emit(movie);
  }

  emitVeto(movie: any, btn): void {
    btn.className="hidden";
    movie.veto = true;
    this.veto.emit(movie);
  }

  open(modal): void {
    modal.open()
  }

  proposable(id: number): boolean{
    return !this.movie.movies.find(item => item.id === id)
  }

  openVideos(movie: IMovieVoted): void {
    this.modalMovie.title = movie.title;
    this._themdb.getVideos(movie.id)
                .subscribe(res => {
                  this.modalMovie.videos = res;
                  this.videosModal.open();
                })
  }

  openReviews(movie: IMovieVoted): void {
    this.modalMovie.title = movie.title;
    this._themdb.getReviews(movie.id)
                .subscribe(res => {
                  this.modalMovie.reviews = res;
                  this.reviewsModal.open();
                })
  }

  openRelated(movie: IMovieVoted): void {
    this.modalMovie.title = movie.title;
    this._themdb.getRelated(movie.id, 1).subscribe(res => {
      this.relatedMovies = res.results;
      this.relatedModal.open();
    })
  }
}
