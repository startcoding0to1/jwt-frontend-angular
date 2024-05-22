import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../_service/auth-service.service';
import { inject } from '@angular/core';
import { LoginService } from '../_service/login.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService =inject(AuthServiceService);
  const router = inject(Router);
  const loginService = inject(LoginService);
  const token = authService.getToken();
  console.log("Token in authgard: ", token)
  if (token !== null) {
    const role = route.data["roles"] as Array<string>;
    if (role) {
      const match = loginService.roleMatch(role);
      if (match) {
        return true;
      }
      else {
        router.navigate(['/forbidden']);
        return false;
      }
    }
  }
  return true;
};
