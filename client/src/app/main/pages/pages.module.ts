import { NgModule } from '@angular/core';

import { Login2Module } from 'app/main/pages/authentication/login-2/login-2.module';
import { Register2Module } from 'app/main/pages/authentication/register-2/register-2.module';
import { Error404Module } from 'app/main/pages/errors/404/error-404.module';
import { Error500Module } from 'app/main/pages/errors/500/error-500.module';
import { ProfileModule } from 'app/main/pages/profile/profile.module';

@NgModule({
    imports: [
        // Authentication
        Login2Module,
        Register2Module,
        // Errors
        Error404Module,
        Error500Module,
        // Profile
        ProfileModule
    ]
})
export class PagesModule {}
