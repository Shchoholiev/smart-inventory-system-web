import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersActivityComponent } from './users-activity.component';

describe('UsersActivityComponent', () => {
  let component: UsersActivityComponent;
  let fixture: ComponentFixture<UsersActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
