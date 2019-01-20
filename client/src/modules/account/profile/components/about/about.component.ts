import { Component, OnInit, Input } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { User } from '../../domain';

@Component({
    selector: 'profile-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: fuseAnimations
})
export class ProfileAboutComponent implements OnInit {
    @Input()
    public profile: User;
    @Input()
    public editMode: boolean;

    constructor() {}

    public ngOnInit(): void {}
}
