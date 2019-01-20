import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from '../../profile.service';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileComponent {
    public editMode = false;
    public userData: any;

    constructor(private readonly _router: Router, private readonly _route: ActivatedRoute, private readonly _profileService: ProfileService) {
        this._route.queryParams.subscribe((params) => {
            if (params.edit) {
                this.editMode = true;
                return;
            }
            this.editMode = false;
        });
        this._profileService.userChanged.subscribe((data) => {
            this.userData = data;
        });
    }

    public editProfile(): void {
        this._router.navigate(['account/profile'], { queryParams: { edit: true } });
    }

    public saveProfile(): void {
        this._router.navigate(['account/profile']);
    }
}
