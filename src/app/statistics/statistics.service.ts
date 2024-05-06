import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { ItemPopularity } from './item-popularity.model';
import { ShelfLoad } from './shelf-load.model';
import { UserActivity } from './user-activity.model';
import { UserDebt } from './user-debt.model';

@Injectable({
    providedIn: 'root'
})
export class StatisticsService {
    
    constructor(
        private apiService: ApiService
    ) { }

    getItemsByPopularity(groupId: string) {
        return this.apiService.get<ItemPopularity[]>(`/items/popularity?groupId=${groupId}`);
    }

    getShelvesByItemsCount(groupId: string) {
        return this.apiService.get<ShelfLoad[]>(`/shelves/items-count?groupId=${groupId}`);
    }

    getUsersByActivityWithItems(groupId: string) {
        return this.apiService.get<UserActivity[]>(`/users/activity?groupId=${groupId}`);
    }

    getUsersWithMostItemsTaken(groupId: string) {
        return this.apiService.get<UserDebt[]>(`/users/items-taken?groupId=${groupId}`);
    }
}
