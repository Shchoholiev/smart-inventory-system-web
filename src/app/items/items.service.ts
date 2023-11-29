import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  
  constructor(
    private apiService: ApiService
  ) { }

  getItem(itemId: string) {
    return this.apiService.get<Item>(`/items/${itemId}`);
  }

  getItems(page: number, size: number, groupId: string, search: string) {
    return this.apiService.get<any>(`/items?page=${page}&size=${size}&groupId=${groupId}&search=${search}`);
  }

  updateShelf(itemId: string, item: Item) {
    return this.apiService.put<Item>(`/items/${itemId}`, item);
  }

  updateItemStatus(itemId: string, isTaken: boolean, comment: string) {
    return this.apiService
      .patch<Item>(`/items/${itemId}/status`, 
        { 
          isTaken: isTaken,
          comment: comment
        });
  }

  getItemHistoryPage(itemId: string, page: number, size: number) {
    return this.apiService.get<any>(`/items/${itemId}/history?page=${page}&size=${size}`);
  }

  delete(itemId: string) {
    return this.apiService.delete(`/items/${itemId}`);
  }
}
