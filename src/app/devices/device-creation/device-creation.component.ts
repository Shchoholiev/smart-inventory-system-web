import { Component } from '@angular/core';
import { DevicesService } from '../devices.service';
import { Device, DeviceType } from '../device.model';

@Component({
  selector: 'app-device-creation',
  templateUrl: './device-creation.component.html',
  styleUrl: './device-creation.component.css'
})
export class DeviceCreationComponent {
  device: Device = new Device();
  result: any = null;
  error = '';
  deviceTypes = this.enumToArray(DeviceType);

  constructor(private devicesService: DevicesService) {}

  createDevice() {
    this.devicesService.createDevice(this.device)
      .subscribe(
        {
          next: data => {
            this.result = data;
            this.error = '';
          },
          error:
            error => {
              this.error = error.error.message;
              this.result = null;
            }
        });
  }

  enumToArray(enumObj: any): { text: string, value: number }[] {
    return Object.keys(enumObj)
      .filter(key => !isNaN(parseInt(key, 10)))
      .map(key => ({ text: enumObj[key], value: parseInt(key, 10) }));
  }
}
