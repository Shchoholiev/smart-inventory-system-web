import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AppRoutingModule } from './app.routes';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ShelvesComponent } from './shelves/shelves/shelves.component';
import { GroupCreationComponent } from './groups/group-creation/group-creation.component';
import { GroupComponent } from './groups/group/group.component';

export function tokenGetter() {
  return localStorage.getItem('accessToken');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ShelvesComponent,
    GroupCreationComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: () => ({
          tokenGetter
        })
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
