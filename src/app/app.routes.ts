import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ShelvesComponent } from './shelves/shelves/shelves.component';
import { GroupCreationComponent } from './groups/group-creation/group-creation.component';

const routes: Routes = [
    { path: '', redirectTo: '/shelves', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'shelves', component: ShelvesComponent, canActivate: [AuthGuard] },
    { path: 'creategroup', component: GroupCreationComponent, canActivate: [AuthGuard] },
    // { path: 'logs', component: ApplicationLogsComponent, canActivate: [AuthGuard] },
    // { path: 'open-ai-logs', component: OpenAiLogsComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
