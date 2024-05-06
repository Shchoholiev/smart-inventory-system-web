import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelvesByItemsCountComponent } from './shelves-by-items-count.component';

describe('ShelvesByItemsCountComponent', () => {
  let component: ShelvesByItemsCountComponent;
  let fixture: ComponentFixture<ShelvesByItemsCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelvesByItemsCountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShelvesByItemsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
