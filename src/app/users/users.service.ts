import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private apiService: ApiService
  ) { }

  getUser(username: string) {
    return this.apiService.get<User>(`/users/${username}`);
  }

  getUsers(page: number, size: number) {
    return this.apiService.get<any>(`/users?pageNumber=${page}&pageSize=${size}`);
  }

  updateUser(userId: string, user: User) {
    return this.apiService.put<User>(`/users/${userId}`, user);
  }

  addUserRole(userId: string, roleName: string) {
    return this.apiService.post<any>(`/users/${userId}/roles/${roleName}`, {});
  }

  removeUserRole(userId: string, roleName: string) {
    return this.apiService.delete(`/users/${userId}/roles/${roleName}`);
  }
}
