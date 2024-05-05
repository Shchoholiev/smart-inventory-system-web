import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from '../item.model';
import { ActivatedRoute } from '@angular/router';
import { Shelf } from '../../shelves/shelf.model';
import { ShelvesService } from '../../shelves/shelves.service';

@Component({
  selector: 'app-items-search',
  templateUrl: './items-search.component.html',
  styleUrl: './items-search.component.css'
})
export class ItemSearchComponent implements OnInit {
  items: Item[] = [];
  isLoading = false;
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  groupId: string;
  searchQuery: string = '';
  isTaken = '';

  shelves: Shelf[] = [];
  shelvesSearchQuery: string = '';
  selectedShelfId: string = '';

  constructor(
    private itemsService: ItemsService, 
    private shelvesService: ShelvesService,
    private route: ActivatedRoute
  ) {
    this.groupId = localStorage.getItem('groupId') || '';
  }

  getShelves(): void {
    this.shelvesService.getShelves(1, 10, this.groupId, this.shelvesSearchQuery)
      .subscribe(data => {
        this.shelves = data.items;
      });
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.currentPage = 1; 
      this.searchItems();
    });
    this.getShelves();
  }

  /**
   * Searches for items based on the search query.
   */
  searchItems(): void {
    this.isLoading = true;
    this.itemsService.getItems(this.currentPage, this.pageSize, this.groupId, this.searchQuery, this.isTaken, this.selectedShelfId)
      .subscribe(
        data => {
          this.items = data.items;
          this.totalPages = data.totalPages;
          this.isLoading = false;
        }
      );
  }

  /**
   * Sets the current page and triggers a search for items.
   * @param page The page number to set.
   */
  setPage(page: number): void {
    this.currentPage = page;
    this.searchItems();
  }

  clear(): void {
    this.searchQuery = '';
    this.selectedShelfId = '';
    this.isTaken = '';
    this.searchItems();
  }
}
