import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mv-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  @Input()
  movies: Array<any> = [];

  constructor() { }

  ngOnInit() {
    
  }

}
