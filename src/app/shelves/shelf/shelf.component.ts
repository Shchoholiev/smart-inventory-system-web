import { Component, OnInit } from '@angular/core';
import { Item } from '../../items/item.model';
import { Shelf } from '../shelf.model';
import { ActivatedRoute } from '@angular/router';
import { ShelvesService } from '../shelves.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrl: './shelf.component.css'
})
export class ShelfDetailComponent implements OnInit {
  shelf: Shelf = new Shelf();
  items: Item[] = [];
  isLoading = true;
  newItem: Item = new Item();
  shelfId = ''

  constructor(
    private route: ActivatedRoute,
    private shelvesService: ShelvesService
  ) { }

  ngOnInit(): void {
    this.shelfId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.shelfId) {
      this.loadShelf(this.shelfId);
      this.loadShelfItems(this.shelfId);
    }
  }

  loadShelf(shelfId: string): void {
    this.shelvesService.getShelf(shelfId).subscribe(shelf => {
      this.shelf = shelf;
    });
  }

  loadShelfItems(shelfId: string): void {
    this.shelvesService.getShelfItems(shelfId).subscribe(items => {
      this.items = items;
      this.isLoading = false;
    });
  }

  addItem(): void {
    this.shelvesService.addItem(this.shelf.id, this.newItem)
      .subscribe(item => {
        this.loadShelfItems(this.shelfId);
        this.newItem = new Item();
      });
  }
}
