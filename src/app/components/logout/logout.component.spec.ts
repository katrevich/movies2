import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { User, IUser } from '../../services/user.service';

class UserMock {
  private user: IUser = {
    username: 'username',
    password: 'pass'
  }

  get admin(){
    return true;
  }

  get username(){
    return this.user.username;
  }

  logout() { }

  isLoggedIn(){
    return true;
  }
}

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      imports: [
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: User, useClass: UserMock},
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
