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
}
