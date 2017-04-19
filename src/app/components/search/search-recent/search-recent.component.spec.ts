import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRecentComponent } from './search-recent.component';

describe('SearchRecentComponent', () => {
  let component: SearchRecentComponent;
  let fixture: ComponentFixture<SearchRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRecentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
