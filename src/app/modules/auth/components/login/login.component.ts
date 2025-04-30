import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  isRegisterMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['']
    });
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
    
    if (this.isRegisterMode) {
      this.loginForm.get('name')?.setValidators([Validators.required]);
    } else {
      this.loginForm.get('name')?.clearValidators();
    }
    this.loginForm.get('name')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password, name } = this.loginForm.value;

    if (this.isRegisterMode) {
      this.authService.register({ email, password, name }).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al registrar usuario';
          this.isLoading = false;
        }
      });
    } else {
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al iniciar sesión';
          this.isLoading = false;
        }
      });
    }
  }
} 