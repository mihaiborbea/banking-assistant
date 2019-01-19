import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from './login.component';

const routes = [
    {
        path: '**',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [LoginComponent],
    imports: [RouterModule.forChild(routes), MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule, FuseSharedModule]
})
export class LoginModule {}
