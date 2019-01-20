import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from '../profile.service';

@Component({
    selector: 'profile-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: fuseAnimations
})
export class ProfileAboutComponent implements OnInit, OnDestroy {
    public about: any;
    private _unsubscribeAll: Subject<any>;

    constructor(private _profileService: ProfileService) {
        this._unsubscribeAll = new Subject();
    }

    public ngOnInit(): void {
        this._profileService.aboutOnChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe((about) => {
            this.about = about;
        });
    }

    public ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
