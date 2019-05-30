import { Injectable } from '@angular/core';
import { Router, 
         CanActivate, 
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         NavigationExtras } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    
  constructor(public authService: AuthService, public router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    if (this.authService.isAuth()) { return true; }

    this.redirectToLogin(url);
    
    return false;
  }

  redirectToLogin(url: string) {
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Create a dummy session id
    let sessionId = 'B4331F505CDDCFF395E4756B0FFA307C99B2D8D3';

    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'denied'
    };

    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
  }
}