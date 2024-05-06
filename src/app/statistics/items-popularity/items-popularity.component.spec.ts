import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsPopularityComponent } from './items-popularity.component';

describe('ItemsPopularityComponent', () => {
  let component: ItemsPopularityComponent;
  let fixture: ComponentFixture<ItemsPopularityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsPopularityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemsPopularityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
