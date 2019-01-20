import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileService } from './profile.service';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileAboutComponent } from './components/about/about.component';

const ProfileRoutes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        resolve: {
            profile: ProfileService
        }
    }
];

@NgModule({
    declarations: [ProfileComponent, ProfileAboutComponent],
    imports: [RouterModule.forChild(ProfileRoutes), MatButtonModule, MatDividerModule, MatIconModule, FuseSharedModule],
    providers: [ProfileService]
})
export class ProfileModule {}
