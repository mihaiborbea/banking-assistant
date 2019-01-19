import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { RegisterComponent } from './register.component';

const routes = [
    {
        path: '**',
        component: RegisterComponent
    }
];

@NgModule({
    declarations: [RegisterComponent],
    imports: [RouterModule.forChild(routes), MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, FuseSharedModule]
})
export class RegisterModule {}
