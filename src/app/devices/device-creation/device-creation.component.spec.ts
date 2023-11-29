import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCreationComponent } from './device-creation.component';

describe('DeviceCreationComponent', () => {
  let component: DeviceCreationComponent;
  let fixture: ComponentFixture<DeviceCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
