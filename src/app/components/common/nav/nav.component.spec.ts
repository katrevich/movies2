import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { User, IUser } from '../../../services/user.service';

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

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
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
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get proper username', () => {
    expect(component.user.username).toBe('username');
  });

  it('should get user profile status', () => {
    expect(component.user.admin).toBe(true);
  });

  it('should get user login status', () => {
    expect(component.user.isLoggedIn()).toBe(true);
  });

  it('should fire logout', () => {
    spyOn(component.user, 'logout');
    component.user.logout();
    expect(component.user.logout).toHaveBeenCalled();
  });
});
