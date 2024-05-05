import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { Shelf } from './shelf.model';
import { Item } from '../items/item.model';

@Injectable({
  providedIn: 'root'
})
export class ShelvesService {
  
  constructor(
    private apiService: ApiService
  ) { }

  getShelf(shelfId: string) {
    return this.apiService.get<Shelf>(`/shelves/${shelfId}`);
  }

  getShelves(page: number, size: number, groupId: string, searchQuery: string) {
    return this.apiService.get<any>(`/shelves?page=${page}&size=${size}&groupId=${groupId}&search=${searchQuery}`);
  }

  updateShelf(shelfId: string, shelf: Shelf) {
    return this.apiService.put<Shelf>(`/shelves/${shelfId}`, shelf);
  }

  getShelfItems(shelfId: string) {
    return this.apiService.get<any>(`/shelves/${shelfId}/items`);
  }

  controlLight(shelfId: string, itemId: string, isOn: boolean) {
    return this.apiService
      .patch<Shelf>(`/shelves/${shelfId}/status`, 
        { 
          isLitUp: isOn ,
          itemId: itemId
        });
  }

  addItem(shelfId: string, item: Item) {
    return this.apiService.post<Item>(`/shelves/${shelfId}/items`, item);
  }
}
