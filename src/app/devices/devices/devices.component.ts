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
  pageSize = 8;
  totalPages = 1;
  groupId;

  constructor(private devicesService: DevicesService) { 
    this.groupId = localStorage.getItem('groupId') || '';
  }

  ngOnInit(): void {
    this.setPage(this.currentPage);
  }

  setPage(page: number): void {
    this.devicesService.getDevices(page, this.pageSize, this.groupId)
      .subscribe(devices => {
        this.devices = devices.items;
        this.totalPages = devices.totalPages;
        this.currentPage = devices.pageNumber;
      });
  }

  activateDevice(): void {
    this.devicesService.activateDevice(this.deviceIdToActivate, this.groupId)
      .subscribe((response) => {
        this.currentPage = 1;
        this.setPage(this.currentPage);
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

  toggleEdit(device: any): void {
    if (device.isEditing) {
      this.devicesService.updateDevice(device.id, device)
        .subscribe(() => {
          device.isEditing = false;
        });
      return;
    }

    device.isEditing = true;
  }
}
