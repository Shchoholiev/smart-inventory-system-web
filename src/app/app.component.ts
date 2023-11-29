import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smart-inventory-system-web';

  public showHeaderAndFooter: boolean = false;

  constructor(
    private router: Router,
    private translate: TranslateService
    ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeaderAndFooter = !event.url.includes('/login') && !event.url.includes('/register');
      }
    });
    
    const savedLanguage = localStorage.getItem('language') || 'en';
    translate.setDefaultLang(savedLanguage);
    translate.use(savedLanguage);
  }
}
