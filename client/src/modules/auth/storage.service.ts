import { Injectable } from '@angular/core';

import { AuthModule } from './auth.module';

@Injectable({
    providedIn: AuthModule
})
export class StorageService {
    private readonly storage = window.localStorage;

    // TODO: enum for localStorage keys
    public setToken(token: string): void {
        this.storage.setItem('TOKEN', token);
    }

    public getToken(): string {
        return this.storage.getItem('TOKEN');
    }

    public deleteToken(): void {
        this.storage.removeItem('TOKEN');
    }
}
