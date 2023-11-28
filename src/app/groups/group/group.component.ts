import { Component, OnInit } from '@angular/core';
import { Group } from '../group.model';
import { GroupsService } from '../groups.service';
import { User } from '../../users/user.model';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit {

  group: Group = new Group();
  users: User[] = [];
  newUsername = '';
  isEditing = false;
  error = '';

  constructor(
    private groupsService: GroupsService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.getGroupDetails();
    this.getGroupUsers();
  }

  getGroupDetails() {
    // Assuming a method to get the group ID
    const groupId = this.getGroupId();
    this.groupsService.getGroupById(groupId).subscribe(group => {
      this.group = group;
    });
  }

  getGroupUsers() {
    const groupId = this.getGroupId();
    this.groupsService.getUsersByGroupId(groupId).subscribe(users => {
      this.users = users;
    });
  }

  updateGroup() {
    const groupId = this.getGroupId();
    this.groupsService.updateGroup(groupId, this.group).subscribe(() => {
      this.isEditing = false;
    });
  }

  addUser() {
    const groupId = this.getGroupId();
    this.usersService
      .getUser(this.newUsername)
      .subscribe(
        {
          next: (user) => {
            this.groupsService.addUserToGroup(groupId, user.id).subscribe(() => {
              this.getGroupUsers();
              this.newUsername = '';
            });
          },
          error: (error) => {
            this.error = 'User not found';
          }
        }
      );
  }

  deleteUser(user: User) {
    const groupId = this.getGroupId();
    this.groupsService.removeUserFromGroup(groupId, user.id).subscribe(() => {
      this.getGroupUsers();
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  private getGroupId(): string {
    const groupId = localStorage.getItem('groupId');
    return groupId ?? '';
  }
}
