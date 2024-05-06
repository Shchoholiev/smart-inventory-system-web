import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ShelvesComponent } from './shelves/shelves/shelves.component';
import { GroupCreationComponent } from './groups/group-creation/group-creation.component';
import { GroupComponent } from './groups/group/group.component';
import { DevicesComponent } from './devices/devices/devices.component';
import { ShelfDetailComponent } from './shelves/shelf/shelf.component';
import { ItemDetailsComponent } from './items/item-details/item-details.component';
import { ItemSearchComponent } from './items/items-search/items-search.component';
import { UsersManagementComponent } from './users/users-management/users-management.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DeviceCreationComponent } from './devices/device-creation/device-creation.component';
import { ItemsPopularityComponent } from './statistics/items-popularity/items-popularity.component';
import { ShelvesByItemsCountComponent } from './statistics/shelves-by-items-count/shelves-by-items-count.component';
import { UsersActivityComponent } from './statistics/users-activity/users-activity.component';
import { UsersByItemsTakenComponent } from './statistics/users-by-items-taken/users-by-items-taken.component';

const routes: Routes = [
    { path: '', redirectTo: '/items', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'shelves', component: ShelvesComponent, canActivate: [AuthGuard] },
    { path: 'shelves/:id', component: ShelfDetailComponent, canActivate: [AuthGuard] },
    { path: 'creategroup', component: GroupCreationComponent, canActivate: [AuthGuard] },
    { path: 'group', component: GroupComponent, canActivate: [AuthGuard] },
    { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
    { path: 'admin/createdevice', component: DeviceCreationComponent, canActivate: [AuthGuard] },
    { path: 'items', component: ItemSearchComponent, canActivate: [AuthGuard] },
    { path: 'items/:id', component: ItemDetailsComponent, canActivate: [AuthGuard] },
    { path: 'search', component: ItemSearchComponent, canActivate: [AuthGuard] },
    { path: 'admin/users', component: UsersManagementComponent, canActivate: [AuthGuard] },
    { path: 'admin/users/:id', component: EditUserComponent, canActivate: [AuthGuard] },
    { path: 'statistics/items-popularity', component: ItemsPopularityComponent, canActivate: [AuthGuard] },
    { path: 'statistics/shelves-items-count', component: ShelvesByItemsCountComponent, canActivate: [AuthGuard] },
    { path: 'statistics/users-activity', component: UsersActivityComponent, canActivate: [AuthGuard] },
    { path: 'statistics/users-by-items-taken', component: UsersByItemsTakenComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
