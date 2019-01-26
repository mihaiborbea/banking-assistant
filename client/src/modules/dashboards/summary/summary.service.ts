import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Account } from '../domain';
import { environment } from 'environments/environment';
import { AuthService } from 'modules/auth/auth.service';

@Injectable()
export class SummaryService implements Resolve<any> {
  public accounts: Account[];

  private apiEndpoint: string = environment.apiUrl + '/users';

  projects: any[];
  widgets: any[];

  constructor(private _httpClient: HttpClient, private readonly _authService: AuthService) {
    const loggedUser = this._authService.getUserAuthData();
    this.apiEndpoint = `${this.apiEndpoint}/${loggedUser._id}`;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getAccounts(), this.getProjects(), this.getWidgets()]).then(() => {
        resolve();
      }, reject);
    });
  }

  public getAccounts(): Promise<any> {
    const apiUrl = this.apiEndpoint + '/accounts';
    return new Promise((resolve, reject) => {
      this._httpClient.get<Account[]>(apiUrl).subscribe((response: any) => {
        this.accounts = response;
        resolve(response);
      }, reject);
    });
  }

  /**
   * Get projects
   *
   * @returns {Promise<any>}
   */
  getProjects(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/project-dashboard-projects').subscribe((response: any) => {
        this.projects = response;
        resolve(response);
      }, reject);
    });
  }

  /**
   * Get widgets
   *
   * @returns {Promise<any>}
   */
  getWidgets(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/project-dashboard-widgets').subscribe((response: any) => {
        this.widgets = response;
        resolve(response);
      }, reject);
    });
  }
}
