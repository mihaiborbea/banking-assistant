import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { fuseAnimations } from '@fuse/animations';

import { User } from '../../domain';
@Component({
    selector: 'profile-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: fuseAnimations
})
export class ProfileAboutComponent implements OnChanges {
    @Input()
    public profile: User;
    @Input()
    public editMode: boolean;

    public profileForm: FormGroup;

    constructor() {}

    public ngOnChanges(): void {
        if (this.editMode) {
            this.initForm();
        }
    }

    private initForm(): void {
        this.profileForm = new FormGroup({
            phone: new FormControl(this.profile.phone),
            email: new FormControl(this.profile.email, Validators.email),
            occupation: new FormControl(this.profile.occupation),
            skills: new FormControl(this.profile.skills),
            gender: new FormControl(this.profile.gender),
            birthdate: new FormControl(this.profile.birthdate),
            about: new FormControl(this.profile.about)
        });
    }
}
