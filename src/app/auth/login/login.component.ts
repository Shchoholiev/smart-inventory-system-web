import { Component } from '@angular/core';
import { Login } from './login.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginModel: Login = new Login();
  public loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  public onSubmit(): void {
    this.authService
      .login(this.loginModel)
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/main']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          if (error.status === 500) {
            this.loginError = 'Server error. Please try again later.';
          } else {
            this.loginError = 'Invalid email, phone, or password.';
          }
        }
      });
  }
}