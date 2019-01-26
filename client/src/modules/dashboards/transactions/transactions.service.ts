import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { Transaction, Collection } from '../domain';
import { environment } from 'environments/environment';
import { AuthService } from 'modules/auth/auth.service';
import * as moment from 'moment';

@Injectable()
export class TransactionsService implements Resolve<any> {
  public collection: Collection<Transaction>;
  public page = 0;
  public pageCount = 10;
  public transactionsChanged: BehaviorSubject<Collection<Transaction>>;
  public chart: any;

  private transactionsEndpoint: string = environment.apiUrl + '/users';
  widgets: any[];

  constructor(private _httpClient: HttpClient, private readonly _authService: AuthService) {
    const loggedUser = this._authService.getUserAuthData();
    this.transactionsEndpoint = `${this.transactionsEndpoint}/${loggedUser._id}/transactions`;
    this.transactionsChanged = new BehaviorSubject(new Collection([]));
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getTransactions(), this.getChart()]).then(() => {
        resolve();
      }, reject);
    });
  }

  public async changePages(page: number, pageCount: number): Promise<void> {
    this.page = page;
    this.pageCount = pageCount;
    await this.getTransactions();
  }

  public getTransactions(): Promise<any> {
    const apiUrl = `${this.transactionsEndpoint}?page=${this.page}&count=${this.pageCount}`;
    return new Promise((resolve, reject) => {
      this._httpClient.get<Collection<Transaction>>(apiUrl).subscribe((trans) => {
        this.collection = trans;
        this.transactionsChanged.next(this.collection);
        resolve(this.collection);
      }, reject);
    });
  }

  public getChart(): Promise<any> {
    return new Promise((resolve, reject) => {
      const apiUrl = `${this.transactionsEndpoint}?aggregate=monthly`;
      this._httpClient.get(apiUrl).subscribe((response: any) => {
        this.chart = this.buildChart(this.prepareChartDataset(response));
        resolve(response);
      }, reject);
    });
  }

  private prepareChartDataset(data: any): any {
    const previousMonthDays = this.getDaysOfMonth(
      moment()
        .subtract(1, 'month')
        .year(),
      moment()
        .subtract(1, 'month')
        .month()
    );
    const currentMonthDays = this.getDaysOfMonth(moment().year(), moment().month());
    const sets = { previous: [], current: [] };
    sets.previous.push({
      label: 'Amount',
      data: previousMonthDays.map((d) => this.getTotalPerDay(+d, data.previous)),
      fill: 'start'
    });
    sets.current.push({
      label: 'Amount',
      data: currentMonthDays.map((d) => this.getTotalPerDay(+d, data.current)),
      fill: 'start'
    });
    return sets;
  }

  private buildChart(data: any): any {
    return {
      chartType: 'line',
      datasets: data,
      labels: {
        previous: this.getDaysOfMonth(
          moment()
            .subtract(1, 'month')
            .year(),
          moment()
            .subtract(1, 'month')
            .month()
        ),
        current: this.getDaysOfMonth(moment().year(), moment().month()).map((d) => moment().format('MMM. ') + d)
      },
      colors: [
        {
          borderColor: '#6ff287',
          backgroundColor: '#6ff287',
          pointBackgroundColor: '#51db6a',
          pointHoverBackgroundColor: '#51db6a',
          pointBorderColor: '#ffffff',
          pointHoverBorderColor: '#ffffff'
        }
      ],
      options: {
        spanGaps: false,
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 32,
            left: 32,
            right: 32
          }
        },
        elements: {
          point: {
            radius: 4,
            borderWidth: 2,
            hoverRadius: 4,
            hoverBorderWidth: 2
          },
          line: {
            tension: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false,
                tickMarkLength: 18
              },
              ticks: {
                fontColor: '#ffffff'
              }
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                min: 0,
                max: 10,
                stepSize: 1
              }
            }
          ]
        },
        plugins: {
          filler: {
            propagate: false
          },
          xLabelsOnTop: {
            active: true
          }
        }
      }
    };
  }

  private getTotalPerDay(day: number, data: any[]): number {
    let sum = 0;
    data.forEach((el) => {
      if (new Date(el.date).getDate() === day) {
        sum++;
      }
    });
    return sum;
  }

  private getDaysOfMonth(year, month): string[] {
    const date = new Date(year, month, 1);
    const result = [];
    while (date.getMonth() === month) {
      result.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return result;
  }
}
