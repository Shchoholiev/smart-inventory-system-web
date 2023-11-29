import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { Device } from './device.model';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(
    private apiService: ApiService
  ) { }

  createDevice(device: Device) {
    return this.apiService.post<any>('/devices', device);
  }

  getDevice(deviceId: string) {
    return this.apiService.get<Device>(`/devices/${deviceId}`);
  }

  getDevices(page: number, size: number, groupId: string) {
    return this.apiService.get<any>(`/devices?page=${page}&size=${size}&groupId=${groupId}`);
  }

  updateDevice(deviceId: string, device: Device) {
    return this.apiService.put<Device>(`/devices/${deviceId}`, device);
  }

  activateDevice(deviceId: string, groupId: string) {
    return this.apiService
      .patch<Device>(`/devices/${deviceId}/status`, {
        groupId: groupId,
        isActive: true
      });
  }

  getScansHistory(deviceId: string, page: number, size: number) {
    return this.apiService.get<any>(`/access-points/${deviceId}/scans-history?page=${page}&size=${size}`);
  }
}