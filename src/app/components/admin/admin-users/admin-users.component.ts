import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User, IUser } from '../../../services/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'mv-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: Array<IUser> = [];
  modal: any;
  userForm: FormGroup;
  loading: boolean = false;

  constructor(
    private _user: User,
    private _toasts: ToastsManager,
    private _modal: NgbModal,
    private _formBuilder: FormBuilder) { }

  open(content) {
    this.modal = this._modal.open(content);
  }

  remove(user: IUser): void {
    this._user.removeUser(user)
              .subscribe(res => {
                if(res.success) {
                  this._toasts.success(res.message);
                  // this.updateUserList();
                  let id = this.users.findIndex((item, i) => item.username === user.username);
                  this.users.splice(id, 1);
                }
              })
  }

  onSubmit(userForm: FormGroup): void {
    this._user.register(userForm.value)
              .subscribe(res => {
                if(res.success) {
                  this._toasts.success(res.message);
                  this.updateUserList();
                  this.modal.close();
                  userForm.reset();
                }
              })
  }

  updateUserList(): void {
    this.loading = true;
    this._user.users.subscribe(res => {
      this.users = res;
      this.loading = false;
    });
  }

  ngOnInit() {
    this.updateUserList();

    this.userForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', Validators.required]
    })
  }

}
