import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, interval, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'modules/navigation/navigation';
import { AuthService } from 'modules/auth/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    trigger('showhide', [
      state('invisible', style({ opacity: '0', visibility: 'hidden' })),
      state('visible', style({ opacity: '1', visibility: 'visible' })),
      transition('invisible <=> visible', animate('2s linear'))
    ])
  ]
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public horizontalNavbar: boolean;
  public rightNavbar: boolean;
  public hiddenNavbar: boolean;
  public navigation: any;
  public userStatusOptions: any[];
  public userDetails: any;

  public heraHints: any = {
    hints: ['Hello, there!', 'Ask me anything :)', 'Check your latest insights..'],
    index: 0,
    visibility: 'invisible'
  };

  private _unsubscribeAll: Subject<any>;

  constructor(
    private readonly _fuseConfigService: FuseConfigService,
    private readonly _fuseSidebarService: FuseSidebarService,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {
    // Set the defaults
    this.userStatusOptions = [
      {
        title: 'Online',
        icon: 'icon-checkbox-marked-circle',
        color: '#4CAF50'
      },
      {
        title: 'Away',
        icon: 'icon-clock',
        color: '#FFC107'
      },
      {
        title: 'Do not Disturb',
        icon: 'icon-minus-circle',
        color: '#F44336'
      },
      {
        title: 'Invisible',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#BDBDBD'
      },
      {
        title: 'Offline',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#616161'
      }
    ];
    this.navigation = navigation;
    this._unsubscribeAll = new Subject();
    this.userDetails = this._authService.getUserAuthData();
  }

  public ngOnInit(): void {
    // Subscribe to the config changes
    this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe((settings) => {
      this.horizontalNavbar = settings.layout.navbar.position === 'top';
      this.rightNavbar = settings.layout.navbar.position === 'right';
      this.hiddenNavbar = settings.layout.navbar.hidden === true;
    });
    this.startHeraHints();
  }

  public ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  public toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  public logout(): void {
    this._authService.logout();
    this._router.navigate(['account', 'login']);
  }

  private startHeraHints(): void {
    interval(2000).subscribe((x) => {
      this.heraHints.visibility = this.heraHints.visibility === 'visible' ? 'invisible' : 'visible';
      if (x % 2 === 0) {
        this.heraHints.index = (x / 2) % 3;
      }
    });
  }
}
