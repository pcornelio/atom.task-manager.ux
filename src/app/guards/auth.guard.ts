import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../modules/auth/services/auth.service';
import { map } from 'rxjs/operators';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated.pipe(
    map(isAuth => isAuth ? true : router.parseUrl('/login'))
  );
}; 