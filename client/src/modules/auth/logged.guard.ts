import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
    constructor(private readonly auth: AuthService, private readonly _router: Router) {}

    canActivate(): boolean {
        if (this.auth.isAuthenticated()) {
            this._router.navigate(['']);
            return false;
        }
        return true;
    }
}
