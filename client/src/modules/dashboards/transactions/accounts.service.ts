import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { Transaction, Collection, Account } from '../domain';
import { environment } from 'environments/environment';
import { AuthService } from 'modules/auth/auth.service';
import * as moment from 'moment';

@Injectable()
export class AccountsService {
  private cardsEndpoint: string = environment.apiUrl + '/users';

  constructor(private _httpClient: HttpClient, private readonly _authService: AuthService) {
    const loggedUser = this._authService.getUserAuthData();
    this.cardsEndpoint = `${this.cardsEndpoint}/${loggedUser._id}/accounts`;
  }

  public async getAccounts(): Promise<Account[]> {
    return await this._httpClient.get<Account[]>(this.cardsEndpoint).toPromise();
  }
}
