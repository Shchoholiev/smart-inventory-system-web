import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersByItemsTakenComponent } from './users-by-items-taken.component';

describe('UsersByItemsTakenComponent', () => {
  let component: UsersByItemsTakenComponent;
  let fixture: ComponentFixture<UsersByItemsTakenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersByItemsTakenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersByItemsTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
