import { Component } from '@angular/core';
import { GlobalUser } from '../../auth/global-user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  globalUser: GlobalUser | null = null;

  constructor(private authService: AuthService) {
    this.authService.globalUser$.subscribe(globalUser => {
      this.globalUser = globalUser;
    });
  }

  public isUserInGroup(): boolean {
    return !!localStorage.getItem('groupId');
  }

  public onLogout(): void {
    this.authService.logout();
  }
}
