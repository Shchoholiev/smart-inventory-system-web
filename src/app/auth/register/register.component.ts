import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Register } from './register.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public registerModel: Register = new Register();
  public error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  public onSubmit(): void {
    this.authService
      .register(this.registerModel)
      .subscribe({
        next: (response) => {
          console.log('Register successful:', response);
          this.router.navigate(['/creategroup']);
        },
        error: (error) => {
          console.error('Register failed:', error);

          this.error = error.error.message;
        }
      });
  }
}
