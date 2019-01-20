import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileComponent {
    public editMode = false;
    constructor(private readonly _router: Router, private readonly _route: ActivatedRoute) {
        this._route.queryParams.subscribe((params) => {
            if (params.edit) {
                this.editMode = true;
                return;
            }
            this.editMode = false;
        });
    }

    public editProfile(): void {
        this._router.navigate(['account/profile'], { queryParams: { edit: true } });
    }

    public saveProfile(): void {
        this._router.navigate(['account/profile']);
    }
}
