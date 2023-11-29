import { Component, OnInit } from '@angular/core';
import { GlobalUser } from '../../auth/global-user.model';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  globalUser: GlobalUser | null = null;
  searchQuery: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.authService.globalUser$.subscribe(globalUser => {
      this.globalUser = globalUser;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchQuery = params['search'];
      }
    });
  }

  isUserInGroup(): boolean {
    return !!localStorage.getItem('groupId');
  }

  onLogout(): void {
    this.authService.logout();
  }

  searchItems(): void {
    this.router.navigate(['/search'], { queryParams: { search: this.searchQuery } });
  }
}
