import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'chat-right-sidenav',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss'],
  animations: fuseAnimations
})
export class ChatRightSidenavComponent {}
