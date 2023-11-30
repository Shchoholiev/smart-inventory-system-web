import { Component, OnInit } from '@angular/core';
import { GlobalUser } from '../../auth/global-user.model';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Represents the HeaderComponent of the application.
 * This component is responsible for displaying the header section of the application.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  /**
   * Represents the global user object.
   * It holds the information of the currently logged-in user.
   */
  globalUser: GlobalUser | null = null;

  /**
   * Represents the search query entered by the user.
   */
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

  /**
   * Initializes the component.
   * It retrieves the search query from the route query parameters, if available.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchQuery = params['search'];
      }
    });
  }

  /**
   * Checks if the user is in a group.
   * @returns A boolean indicating whether the user is in a group or not.
   */
  isUserInGroup(): boolean {
    return !!localStorage.getItem('groupId');
  }

  /**
   * Logs out the user by calling the logout method of the AuthService.
   */
  onLogout(): void {
    this.authService.logout();
  }

  /**
   * Performs a search for items based on the search query.
   * It navigates to the search page with the search query as a query parameter.
   */
  searchItems(): void {
    this.router.navigate(['/search'], { queryParams: { search: this.searchQuery } });
  }
}
