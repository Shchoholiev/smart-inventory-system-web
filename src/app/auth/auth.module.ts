import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  imports: [
    FormsModule,
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