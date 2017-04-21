import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../services/app.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'mv-admin-general',
  templateUrl: './admin-general.component.html',
  styleUrls: ['./admin-general.component.css']
})
export class AdminGeneralComponent implements OnInit {

  constructor(
    private _app: AppState,
    private _toasts: ToastsManager
  ) { }

  restart(): void {
    this._app.restartVoting();
  }

  end(): void {
    this._app.endVoting()
              .subscribe(res => {
                if(res.success) {
                  this._toasts.success(res.message);
                  this._app.getState();
                }
              })
  }

  ngOnInit() {

  }

}
