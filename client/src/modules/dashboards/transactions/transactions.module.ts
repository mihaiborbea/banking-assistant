import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
  MatPaginatorModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { TransactionsComponent } from './transactions.component';
import { TransactionsService } from './transactions.service';
import { CardsService } from './cards.service';

const routes: Routes = [
  {
    path: '**',
    component: TransactionsComponent,
    resolve: {
      data: TransactionsService
    }
  }
];

@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,

    NgxChartsModule,
    ChartsModule,

    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule
  ],
  providers: [TransactionsService, CardsService]
})
export class TransactionsModule {}
