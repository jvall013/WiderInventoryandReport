import { Injectable } from '@angular/core';
import { Router, 
         CanActivate, 
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         NavigationExtras } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate {
    
  constructor(public authService: AuthService, public router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    // First we check that the user is Authenticated
    if(this.checkLogin(url)) {

      // this will be passed from the route config
      // on the data property
      const expectedRole = route.data.expectedRole;
      
      if(this.authService.role === expectedRole) {
        return true;
      } else {
        this.redirectToSecure(url);
        return false;
      }
    } else {
      return false;
    }

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
    let sessionId = '22f1f367ee68d48e7c6a6476b5';

    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'denied'
    };

    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
  }

  redirectToSecure(url: string) {
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Create a dummy session id
    let sessionId = '22f1f367ee68d48e7c6a6476b5';

    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'denied'
    };

    // Navigate to the login page with extras
    this.router.navigate(['/access_denied'], navigationExtras);
  }

}