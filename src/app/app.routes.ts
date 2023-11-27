import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    // { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    // { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
    // { path: 'logs', component: ApplicationLogsComponent, canActivate: [AuthGuard] },
    // { path: 'open-ai-logs', component: OpenAiLogsComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
