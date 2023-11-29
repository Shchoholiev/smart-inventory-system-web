import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  user: User = new User();
  isLoading = false;
  isEditing = false;
  newRole = '';
  error = '';
  userId: string = '';
  username: string = '';

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') ?? '';
    this.route.queryParams.subscribe(params => {
      if (params['username']) {
        this.username = params['username'];
        this.loadUser(this.username);
      }
    });
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.updateUser();
    } else {
      this.isEditing = true;
    }
  }

  loadUser(username: string): void {
    this.isLoading = true;
    this.usersService.getUser(username).subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching user', error);
        this.isLoading = false;
      }
    });
  }

  updateUser(): void {
    this.usersService.updateUser(this.userId, this.user).subscribe({
      next: (user) => {
        this.user = user;
        this.isEditing = false;
        this.error = '';
      },
      error: (error) => {
        console.error('Error updating user', error);
        this.error = error.error.message;
      }
    });
  }

  addUserRole(): void {
    if (this.user.roles.some(role => role.name === this.newRole)) {
      this.error = 'User already has this role.';
      return;
    }
    this.usersService.addUserRole(this.userId, this.newRole).subscribe({
      next: () => {
        this.user.roles.push({ id: '', name: this.newRole });
        this.newRole = '';
        this.error = '';
      },
      error: (error) => {
        console.error('Error adding role', error);
        this.error = 'Failed to add role.';
      }
    });
  }

  removeUserRole(roleName: string): void {
    this.usersService.removeUserRole(this.userId, roleName).subscribe({
      next: () => {
        this.user.roles = this.user.roles.filter(role => role.name !== roleName);
        this.error = '';
      },
      error: (error) => {
        console.error('Error removing role', error);
        this.error = error.error.message;
      }
    });
  }
}
