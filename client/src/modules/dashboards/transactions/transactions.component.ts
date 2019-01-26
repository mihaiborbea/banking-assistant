import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as shape from 'd3-shape';
import { fuseAnimations } from '@fuse/animations';
import { TransactionsService } from './transactions.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Transaction, Collection } from '../domain';
import { environment } from 'environments/environment';
import { MatPaginator } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TransactionsComponent implements OnInit, OnDestroy {
  public apiRoot = environment.apiUrl;
  public collection: Collection<Transaction>;
  public columnsToDisplay = ['amount', 'to', 'date', 'category'];
  public chart: any;

  public selectedMonth = 'current';

  public currentDate = new Date();

  private _unsubscribe: Subject<any> = new Subject();

  projects: any[];
  selectedProject: any;
  widget1SelectedYear = '2016';

  widgets: any;
  widget11: any = {};

  dateNow = Date.now();

  constructor(private _fuseSidebarService: FuseSidebarService, private _transactionsService: TransactionsService) {
    this._registerCustomChartJSPlugin();

    setInterval(() => {
      this.dateNow = Date.now();
    }, 1000);
  }

  public ngOnInit(): void {
    this._transactionsService.transactionsChanged.pipe(takeUntil(this._unsubscribe)).subscribe((data) => {
      this.collection = data;
    });
    this.chart = this._transactionsService.chart;
    this.widgets = this._transactionsService.widgets;
    this.widget11.onContactsChanged = new BehaviorSubject({});
    this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
    this.widget11.dataSource = new FilesDataSource(this.widget11);
  }

  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  public async pageChanges(pageIndex: number, pageSize: number): Promise<void> {
    await this._transactionsService.changePages(pageIndex, pageSize);
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  private _registerCustomChartJSPlugin(): void {
    (<any>window).Chart.plugins.register({
      afterDatasetsDraw: (chart, easing) => {
        // Only activate the plugin if it's made available
        // in the options
        if (
          !chart.options.plugins.xLabelsOnTop ||
          (chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
        ) {
          return;
        }

        // To only draw at the end of animation, check for easing === 1
        const ctx = chart.ctx;

        chart.data.datasets.forEach((dataset, i) => {
          const meta = chart.getDatasetMeta(i);
          if (!meta.hidden) {
            meta.data.forEach((element, index) => {
              // Draw the text in black, with the specified font
              ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
              const fontSize = 13;
              const fontStyle = 'normal';
              const fontFamily = 'Roboto, Helvetica Neue, Arial';
              ctx.font = (<any>window).Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

              // Just naively convert to string for now
              const dataString = dataset.data[index].toString() + 'k';

              // Make sure alignment settings are correct
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              const padding = 15;
              const startY = 24;
              const position = element.tooltipPosition();
              ctx.fillText(dataString, position.x, startY);

              ctx.save();

              ctx.beginPath();
              ctx.setLineDash([5, 3]);
              ctx.moveTo(position.x, startY + padding);
              ctx.lineTo(position.x, position.y - padding);
              ctx.strokeStyle = 'rgba(255,255,255,0.12)';
              ctx.stroke();

              ctx.restore();
            });
          }
        });
      }
    });
  }
}

export class FilesDataSource extends DataSource<any> {
  /**
   * Constructor
   *
   * @param _widget11
   */
  constructor(private _widget11) {
    super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    return this._widget11.onContactsChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void {}
}
