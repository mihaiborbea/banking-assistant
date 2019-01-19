import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserCredentials } from './domain/interfaces';
import { environment } from 'environments/environment';
import { AuthModule } from './auth.module';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: AuthModule
})
export class AuthService {
    private readonly loginEndpoint: string = environment.apiUrl + '/auth/login';
    private readonly registerEndpoint: string = environment.apiUrl + '/users';

    constructor(private readonly _http: HttpClient, private readonly _storageService: StorageService, private _jwtHelper: JwtHelperService) {}

    public async login(credentials: UserCredentials): Promise<boolean> {
        const token = await this.auth(credentials);
        if (token) {
            this._storageService.setToken(token);
            return true;
        }
        return false;
    }

    public async register(credentials: UserCredentials): Promise<boolean> {
        const createdUser = await this._http.post(this.registerEndpoint, credentials).toPromise();
        if (createdUser) {
            return true;
        }
        return false;
    }

    public isAuthenticated(): boolean {
        const token = this._storageService.getToken();
        if (token) {
            return !this._jwtHelper.isTokenExpired(token);
        }
        return false;
    }

    private async auth(credentials: UserCredentials): Promise<any> {
        return this._http
            .post(this.loginEndpoint, credentials)
            .pipe(map((res) => res['accessToken']))
            .toPromise();
    }
}
