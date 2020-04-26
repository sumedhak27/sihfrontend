import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseAuthComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: FirebaseAuthComponent;
  let fixture: ComponentFixture<FirebaseAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirebaseAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
