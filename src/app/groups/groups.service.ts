import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { Group } from './group.model';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

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
        map(response => {
            return this.authService.refreshTokens();
          }
        )
      );
  }
}
