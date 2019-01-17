import { Injectable } from '@angular/core';
import { AuthModule } from './auth.module';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserCredentials } from './domain/interfaces';
import { environment } from 'environments/environment';

import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly endpoint: string = environment.apiUrl + '/auth/login';

    constructor(private readonly _http: HttpClient, private readonly _storageService: StorageService, private _jwtHelper: JwtHelperService) {}

    public async login(credentials: UserCredentials): Promise<boolean> {
        const token = await this.auth(credentials);
        if (token) {
            this._storageService.setToken(token);
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
            .post(this.endpoint, credentials)
            .pipe(map((res) => res['accessToken']))
            .toPromise();
    }
}
