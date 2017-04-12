import { Component } from '@angular/core';
import { User } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm = this._formBuilder.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  constructor(private _user: User, private _formBuilder: FormBuilder) { }

  onSubmit(event): void {
    this._user.login(this.loginForm.value.username, this.loginForm.value.password);
  }
}
