import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { Group } from './group.model';
import { map, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/user.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  createGroup(group: Group) {
    return this.apiService
      .post<Group>('/groups', group)
      .pipe(
        switchMap(group => {
            return this.authService.refreshTokens();
          }
        )
      );
  }

  getGroupById(groupId: string) {
    return this.apiService.get<Group>(`/groups/${groupId}`);
  }

  updateGroup(groupId: string, group: Group) {
    return this.apiService.put<Group>(`/groups/${groupId}`, group);
  }

  addUserToGroup(groupId: string, userId: string) {
    return this.apiService.post<Group>(`/groups/${groupId}/users/${userId}`, {});
  }

  removeUserFromGroup(groupId: string, userId: string) {
    return this.apiService.delete(`/groups/${groupId}/users/${userId}`);
  }

  leaveGroup(groupId: string) {
    return this.apiService.delete(`/groups/${groupId}/users`)
    .pipe(map((response) => {
      localStorage.removeItem('groupId');
      return response;
    }));
  }

  getUsersByGroupId(groupId: string) {
    return this.apiService.get<User[]>(`/groups/${groupId}/users`);
  }
}
