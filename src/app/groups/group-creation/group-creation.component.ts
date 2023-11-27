import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group } from '../group.model';
import { GroupsService } from '../groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styleUrl: './group-creation.component.css'
})
export class GroupCreationComponent {

  group = new Group();

  error = '';

  constructor(
    private groupsService: GroupsService,
    private router: Router
  ) {}

  createGroup() {
      console.log(this.group);
      
      this.groupsService
        .createGroup(this.group)
        .subscribe(
          {
            next: (group) => {
              this.router.navigate(['']);
            },
            error: (error) => {
              console.log(error);
            
              this.error = error.error.message;
            }
          }
        )
  }
}