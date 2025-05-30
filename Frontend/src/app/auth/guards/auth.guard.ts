import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    
    canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
        console.log('Can Match');
        console.log({ route, segments});
        return this.checkAuthStatus();    
    }
     
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        console.log('Can Activate');
        console.log({ route, state});
        return this.checkAuthStatus();
    }

    private checkAuthStatus(): boolean | Observable<boolean>{
        return this.authService.checkAuthenticacion()
          .pipe(
            tap( isAuthenticated => {
              if ( ! isAuthenticated ){
                this.router.navigate(['/auth/login'])
              }
            }),
            map((isAuthenticated) => isAuthenticated)
          );
    }
}