import { Component, OnInit } from '@angular/core';
import { Shelf } from '../shelf.model';
import { ShelvesService } from '../shelves.service';

@Component({
  selector: 'app-shelves',
  templateUrl: './shelves.component.html',
  styleUrl: './shelves.component.css'
})

export class ShelvesComponent implements OnInit {
  shelves: Shelf[] = [];
  groupedShelves: { [key: string]: Shelf[] } = {};
  currentPage = 1;
  pageSize = 8;
  totalPages = 1;
  groupId: string;

  constructor(
    private shelvesService: ShelvesService
    ) {
    this.groupId = localStorage.getItem('groupId') || '';
  }

  ngOnInit(): void {
    this.setPage(this.currentPage);
  }

  setPage(page: number): void {
    this.shelvesService.getShelves(page, this.pageSize, this.groupId)
      .subscribe(data => {
        this.shelves = data.items;
        this.totalPages = data.totalPages;
        this.currentPage = data.pageNumber;
        this.groupShelvesByDeviceId();
      });
  }

  toggleEdit(shelf: Shelf): void {
    if (shelf.isEditing) {
      this.shelvesService.updateShelf(shelf.id, shelf)
        .subscribe(() => {
          shelf.isEditing = false;
        });
      return;
    }

    shelf.isEditing = true;
  }

  groupShelvesByDeviceId(): void {
    this.groupedShelves = this.shelves.reduce((group, shelf) => {
      (group[shelf.deviceId] = group[shelf.deviceId] || []).push(shelf);
      return group;
    }, {} as { [key: string]: Shelf[] });
  }

  getDeviceIds(): string[] {
    return Object.keys(this.groupedShelves);
  }
}
