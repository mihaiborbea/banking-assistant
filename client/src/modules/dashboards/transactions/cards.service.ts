import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { Transaction, Collection } from '../domain';
import { environment } from 'environments/environment';
import { AuthService } from 'modules/auth/auth.service';
import * as moment from 'moment';

@Injectable()
export class CardsService {
  public collection: Collection<Transaction>;
  public transactionsChanged: BehaviorSubject<Collection<Transaction>>;

  private cardsEndpoint: string = environment.apiUrl + '/users';

  constructor(private _httpClient: HttpClient, private readonly _authService: AuthService) {
    const loggedUser = this._authService.getUserAuthData();
    this.cardsEndpoint = `${this.cardsEndpoint}/${loggedUser._id}/cards`;
    this.transactionsChanged = new BehaviorSubject(new Collection([]));
  }

  public getTransactions(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<Collection<Transaction>>(this.cardsEndpoint).subscribe((trans) => {
        this.collection = trans;
        this.transactionsChanged.next(this.collection);
        resolve(this.collection);
      }, reject);
    });
  }
}
