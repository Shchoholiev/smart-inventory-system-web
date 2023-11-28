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

const routes: Routes = [
    { path: '', redirectTo: '/items', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'shelves', component: ShelvesComponent, canActivate: [AuthGuard] },
    { path: 'shelves/:id', component: ShelfDetailComponent, canActivate: [AuthGuard] },
    { path: 'creategroup', component: GroupCreationComponent, canActivate: [AuthGuard] },
    { path: 'group', component: GroupComponent, canActivate: [AuthGuard] },
    { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
    { path: 'items/:id', component: ItemDetailsComponent, canActivate: [AuthGuard] },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
