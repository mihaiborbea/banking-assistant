import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path: 'analytics',
        loadChildren: './analytics/analytics.module#AnalyticsDashboardModule'
    },
    {
        path: 'project',
        loadChildren: './project/project.module#ProjectDashboardModule'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FuseSharedModule]
})
export class DashboardsModule {}
