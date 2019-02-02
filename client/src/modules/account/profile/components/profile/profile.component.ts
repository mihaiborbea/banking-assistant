import { Component, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from '../../profile.service';
import { User } from '../../domain';
import { ProfileAboutComponent } from '../about/about.component';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProfileComponent implements OnDestroy {
  @ViewChild('aboutCmp')
  public about: ProfileAboutComponent;

  public editMode = false;
  public userData: User;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _profileService: ProfileService
  ) {
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
    this._unsubscribeAll = new Subject();
  }

  public ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  public editProfile(): void {
    this._router.navigate(['account/profile'], { queryParams: { edit: true } });
  }

  public async updateProfile(): Promise<void> {
    try {
      await this._profileService.updateUser(this.about.profileForm.value);
      this._router.navigate(['account/profile']);
    } catch (e) {
      console.error(e);
    }
  }
}
