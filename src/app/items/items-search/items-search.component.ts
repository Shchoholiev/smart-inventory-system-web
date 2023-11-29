import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from '../item.model';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private itemsService: ItemsService, 
    private route: ActivatedRoute) {
    this.groupId = localStorage.getItem('groupId') || '';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.currentPage = 1; 
      this.searchItems();
    });
  }

  searchItems(): void {
    this.isLoading = true;
    this.itemsService.getItems(this.currentPage, this.pageSize, this.groupId, this.searchQuery).subscribe(
      data => {
        this.items = data.items;
        this.totalPages = data.totalPages;
        this.isLoading = false;
      }
    );
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.searchItems();
  }
}
