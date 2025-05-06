import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const sellerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUserData$().pipe(
    take(1),
    map((user) => {
      if (user && user.role === 'seller') {
        return true;
      } else {
        console.log('not seller');
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
