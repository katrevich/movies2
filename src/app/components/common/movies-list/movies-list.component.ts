import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../services/user.service';
import { AppState } from '../../../services/app.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'mv-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
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
    private _app: AppState
  ) { }

  ngOnInit() {

  }

  onClick(movie: any) {
    this.voted.emit(movie);
  }

  onClickVeto(movie: any) {
    console.log('emit remove');
    this.remove.emit(movie);
  }
}
