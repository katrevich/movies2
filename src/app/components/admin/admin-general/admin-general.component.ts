import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../services/app.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'mv-admin-general',
  templateUrl: './admin-general.component.html',
  styleUrls: ['./admin-general.component.css']
})
export class AdminGeneralComponent implements OnInit {
  loading: boolean = false;

  constructor(
    public app: AppState,
    private _toasts: ToastsManager
  ) { }

  restart(): void {
    this.app.restartVoting();
  }

  end(): void {
    this.app.endVoting()
              .subscribe(res => {
                if(res.success) {
                  this._toasts.success(res.message);
                  this.app.getState();
                }
              })
  }

  ngOnInit() {

  }

}
