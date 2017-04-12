import { Injectable } from '@angular/core';

@Injectable()
export class User{
  private logginedIn = true;

  constructor(){}

  login(): void {}

  logout(): void {}

  isloggedIn(): boolean {
    return this.logginedIn;
  }
}
