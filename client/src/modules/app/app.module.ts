import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule } from '@fuse/components';

import { fuseConfig } from '../fuse-config/';

import { FakeDbService } from '../fake-db/fake-db.service';
import { AppComponent } from '../app/app.component';
import { LayoutModule } from '../layout/layout.module';
import { AuthGuard } from 'modules/auth/auth.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { AuthModule } from 'modules/auth/auth.module';
import { JwtModule } from '@auth0/angular-jwt';

const appRoutes: Routes = [
    {
        path: 'account',
        loadChildren: '../account/account.module#AccountModule'
    },
    {
        path: 'profile',
        canLoad: [AuthGuard],
        loadChildren: '../profile/profile.module#ProfileModule'
    },
    {
        path: 'dashboards',
        canLoad: [AuthGuard],
        loadChildren: '../dashboards/dashboards.module#DashboardsModule'
    },
    {
        path: 'chat',
        canLoad: [AuthGuard],
        loadChildren: '../chat/chat.module#ChatModule'
    },
    {
        path: 'error',
        canLoad: [AuthGuard],
        loadChildren: '../error/error.module#ErrorModule'
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboards/analytics'
    }
];

export function tokenGetter(): string {
    return localStorage.getItem('TOKEN');
}
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['example.com'],
                blacklistedRoutes: ['example.com/examplebadroute/']
            }
        }),

        // Material
        MatButtonModule,
        MatIconModule,
        MatMomentDateModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,

        // App modules
        LayoutModule,
        AuthModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
