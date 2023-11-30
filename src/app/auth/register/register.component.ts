import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Register } from './register.model';
import { Router } from '@angular/router';

/**
 * Component for user registration.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  /**
   * The model for user registration.
   */
  public registerModel: Register = new Register();
  
  /**
   * Error message to display in case of registration failure.
   */
  public error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Handles the form submission for user registration.
   */
  public onSubmit(): void {
    this.authService
      .register(this.registerModel)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/creategroup']);
        },
        error: (error) => {
          this.error = error.error.message;
        }
      });
  }
}
