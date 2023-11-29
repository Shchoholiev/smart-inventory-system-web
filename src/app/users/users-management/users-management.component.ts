import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Role } from '../role.model';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css'
})
export class UsersManagementComponent {
  users: User[] = [];
  isLoading = false;
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  groupId: string;

  constructor(private usersService: UsersService) {
    this.groupId = localStorage.getItem('groupId') || '';
  }

  ngOnInit(): void {
    this.setPage(this.currentPage);
  }

  setPage(page: number): void {
    this.isLoading = true;
    this.usersService.getUsers(page, this.pageSize).subscribe(
      data => {
        this.users = data.items;
        this.totalPages = data.totalPages;
        this.currentPage = data.pageNumber;
        this.isLoading = false;
      }
    );
  }

  formatRoles(roles: Role[]): string {
    if (!roles || roles.length === 0) {
      return 'No roles';
    }
    return roles.map(role => role.name).join(', ');
  }
}
