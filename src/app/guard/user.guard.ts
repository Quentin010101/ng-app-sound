import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/security/authentication.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const _authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if(_authenticationService.getUserIsAuthenticated) {
    return true;
  }

  router.navigateByUrl('/login')
  return false;
};
