import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { AuthService } from 'modules/auth/auth.service';
import { User } from './domain';

@Injectable()
export class ProfileService implements Resolve<any> {
    public user: any;
    public userChanged: BehaviorSubject<User>;

    private userEndpoint: string = environment.apiUrl + '/users';

    constructor(private _httpClient: HttpClient, private readonly _authService: AuthService) {
        const loggedUserData = this._authService.getUserAuthData();
        this.userEndpoint = `${this.userEndpoint}/${loggedUserData._id}`;
        this.userChanged = new BehaviorSubject(new User());
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getUser()]).then(() => {
                resolve();
            }, reject);
        });
    }

    public getUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get<User>(this.userEndpoint).subscribe((usr: any) => {
                this.user = usr;
                this.userChanged.next(Object.assign(new User(), this.user));
                resolve(this.user);
            }, reject);
        });
    }

    public updateUser(user: User): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.patch<User>(this.userEndpoint, user).subscribe((usr: any) => {
                this.user = usr;
                this.userChanged.next(Object.assign(new User(), this.user));
                resolve(this.user);
            }, reject);
        });
    }
}
