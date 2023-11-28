import { Component } from '@angular/core';
import { DevicesService } from '../devices.service';
import { Device, DeviceType } from '../device.model';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent {
  devices: Device[] = [];
  deviceIdToActivate = '';
  currentPage = 1;
  pageSize = 10;
  groupId;

  constructor(private devicesService: DevicesService) { 
    this.groupId = localStorage.getItem('groupId') || '';
  }

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.devicesService.getDevices(this.currentPage, this.pageSize, this.groupId)
      .subscribe(devices => {
        this.devices = devices.items;
      });
  }

  activateDevice(): void {
    this.devicesService.activateDevice(this.deviceIdToActivate, this.groupId)
      .subscribe((response) => {
        console.log(response);
        
        this.loadDevices();
        this.deviceIdToActivate = '';
      });
  }

  getDeviceTypeString(type: DeviceType): string {
    switch (type) {
      case DeviceType.Rack4ShelfController:
        return 'Controller for Rack of 4 Shelfs';
      case DeviceType.AccessPoint:
        return 'Access Point';
      default:
        return 'Unknown';
    }
  }
}
