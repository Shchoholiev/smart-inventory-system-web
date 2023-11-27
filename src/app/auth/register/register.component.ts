import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Register } from './register.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public registerModel: Register = new Register();
  public error: string = '';

  yourForm = new FormGroup({
    property1: new FormControl(''),
    property2: new FormControl(0)
    // ...
  });

  constructor(private authService: AuthService, private router: Router) {}

  public onSubmit(): void {
    this.authService
      .register(this.registerModel)
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        
          if (error.status === 500) {
            this.error = 'Server error. Please try again later.';
          } else {
            this.error = 'Invalid email, phone, or password.';
          }
        }
      });
  }
}
