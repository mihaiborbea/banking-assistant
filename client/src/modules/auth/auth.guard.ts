import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';

import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';

@Injectable({
    providedIn: AuthModule
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private readonly auth: AuthService, private readonly _router: Router) {}

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this._router.navigate(['account', 'login']);
            return false;
        }
        return true;
    }

    canLoad(): boolean {
        if (!this.auth.isAuthenticated()) {
            this._router.navigate(['account', 'login']);
            return false;
        }
        return true;
    }
}
