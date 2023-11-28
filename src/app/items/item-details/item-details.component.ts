import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { ItemHistory, ItemHistoryType } from '../item-history.model';
import { ItemsService } from '../items.service';
import { ActivatedRoute } from '@angular/router';
import { Shelf } from '../../shelves/shelf.model';
import { ShelvesService } from '../../shelves/shelves.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {
  item: Item = new Item();
  shelf: Shelf = new Shelf();
  itemHistory: ItemHistory[] = [];
  isEditing = false;
  isLoading = true;

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  itemId = '';

  comment = '';

  constructor(
    private itemsService: ItemsService,
    private shelvesService: ShelvesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.itemId) {
      this.loadItem(this.itemId);
      this.setPage(1);
    }
  }

  loadItem(itemId: string): void {
    this.itemsService.getItem(itemId).subscribe(
      item => {
        this.item = item;
        this.loadShelf(item.shelfId); 
      }
    );
  }

  loadShelf(shelfId: string): void {
    this.shelvesService.getShelf(shelfId).subscribe(
      shelf => {
        this.shelf = shelf;
        this.isLoading = false;
      }
    );
  }

  loadItemHistory(itemId: string): void {
    this.itemsService.getItemHistoryPage(itemId, this.currentPage, this.pageSize).subscribe(
      historyPage => {
        this.itemHistory = historyPage.items;
        this.totalPages = historyPage.totalPages;
      },
      error => console.error('Error loading item history', error)
    );
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.loadItemHistory(this.itemId);
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  updateItem(): void {
    this.itemsService.updateShelf(this.item.id, this.item).subscribe(
      () => {
        this.loadItem(this.itemId);
        this.isEditing = false;
      }
    );
  }

  updateItemStatus(): void {
    this.itemsService.updateItemStatus(this.item.id, !this.item.isTaken, this.comment).subscribe(
      updatedItem => {
        this.item = updatedItem;
        this.comment = '';
        this.setPage(1);
      }
    );
  }

  getHistoryTypeText(type: ItemHistoryType): string {
    switch (type) {
      case ItemHistoryType.Manual: return 'Manually Recorded';
      case ItemHistoryType.Scan: return 'Scanned by Access Point';
      case ItemHistoryType.Shelf: return 'Motion on a Shelf';
      default: return 'Unknown';
    }
  }

  toggleShelfLight(): void {
    const shelfId = this.item.shelfId;
    const newLightStatus = !this.shelf.isLitUp;

    this.shelvesService.controlLight(shelfId, this.item.id, newLightStatus).subscribe(
        updatedShelf => {
            this.shelf = updatedShelf;
        }
    );
  }
}