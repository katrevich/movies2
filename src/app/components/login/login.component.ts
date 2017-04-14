import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private _user: User, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
        username: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
        password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)])
    });
  }

  onSubmit(): void {
    this._user.login(this.loginForm.value.username, this.loginForm.value.password);
  }
}
