import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path: '404',
        loadChildren: './404/error-404.module#Error404Module'
    },
    {
        path: '500',
        loadChildren: './500/error-500.module#Error500Module'
    },
    {
        path: '**',
        redirectTo: '404'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FuseSharedModule]
})
export class ErrorModule {}
