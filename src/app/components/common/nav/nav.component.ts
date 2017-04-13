import { Component, OnInit } from '@angular/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'mv-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _user: User) { }

  ngOnInit() {
  }

  // logout(): void{
  //   this._user.logout();
  // }

}
