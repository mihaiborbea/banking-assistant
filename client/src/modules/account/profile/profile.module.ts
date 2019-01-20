import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile.component';
import { ProfileTimelineComponent } from './tabs/timeline/timeline.component';
import { ProfileAboutComponent } from './tabs/about/about.component';
import { ProfilePhotosVideosComponent } from './tabs/photos-videos/photos-videos.component';

const routes = [
    {
        path: '',
        component: ProfileComponent,
        resolve: {
            profile: ProfileService
        }
    }
];

@NgModule({
    declarations: [ProfileComponent, ProfileTimelineComponent, ProfileAboutComponent, ProfilePhotosVideosComponent],
    imports: [RouterModule.forChild(routes), MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule, FuseSharedModule],
    providers: [ProfileService]
})
export class ProfileModule {}
