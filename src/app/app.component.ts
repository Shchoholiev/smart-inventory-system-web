import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smart-inventory-system-web';

  public showHeaderAndFooter: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeaderAndFooter = !event.url.includes('/login') && !event.url.includes('/register');
      }
    });
  }
}
