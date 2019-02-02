import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
  {
    path: 'transactions',
    loadChildren: './transactions/transactions.module#TransactionsModule'
  },
  {
    path: 'error',
    loadChildren: '../error/error.module#ErrorModule'
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FuseSharedModule]
})
export class DashboardsModule {}
