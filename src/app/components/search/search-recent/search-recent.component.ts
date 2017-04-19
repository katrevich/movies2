import { Component, OnInit } from '@angular/core';
import { Themdb, IGenre, IMovie } from '../../../services/themdb.service';

@Component({
  selector: 'mv-search-recent',
  templateUrl: './search-recent.component.html',
  styleUrls: ['./search-recent.component.css']
})
export class SearchRecentComponent implements OnInit {
  page: number = 1;
  moviesList: Array<IMovie> = [];

  constructor() { }

  ngOnInit() {
  }

}
