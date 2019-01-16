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
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from 'modules/auth/auth.guard';
import { LoggedGuard } from 'modules/auth/logged.guard';

const appRoutes: Routes = [
    {
        path: 'auth',
        canActivate: [LoggedGuard],
        loadChildren: '../auth/auth.module#AuthModule'
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: '../profile/profile.module#ProfileModule'
    },
    {
        path: 'dashboards',
        loadChildren: '../dashboards/dashboards.module#DashboardsModule'
    },
    {
        path: 'chat',
        loadChildren: '../chat/chat.module#ChatModule'
    },
    {
        path: 'error',
        loadChildren: '../error/error.module#ErrorModule'
    },
    {
        path: '**',
        redirectTo: '/dashboards/analytics'
    }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem('TOKEN'),
                whitelistedDomains: ['localhost:4001'],
                headerName: 'Authorization',
                authScheme: 'Bearer '
                // blacklistedRoutes: ['localhost:4001/auth']
            }
        }),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,

        // App modules
        LayoutModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
