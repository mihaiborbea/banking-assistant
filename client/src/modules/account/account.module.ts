import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedGuard } from 'modules/auth/logged.guard';

const AccountRoutes: Routes = [
    {
        path: 'login',
        canLoad: [LoggedGuard],
        loadChildren: './login/login.module#LoginModule'
    },
    {
        path: 'register',
        canLoad: [LoggedGuard],
        loadChildren: './register/register.module#RegisterModule'
    }
];

@NgModule({
    imports: [RouterModule.forChild(AccountRoutes)]
})
export class AccountModule {}