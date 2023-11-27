import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('accessToken'),
        allowedDomains: ['example.com'],
        disallowedRoutes: ['example.com/login']
      }
    })
  ],
  exports: [JwtModule]
})
export class AuthModule { }