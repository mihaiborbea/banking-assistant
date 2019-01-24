import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ChatService } from '../../chat.service';

@Component({
  selector: 'chat-right-sidenav',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss'],
  animations: fuseAnimations
})
export class ChatRightSidenavComponent implements OnInit, OnDestroy {
  contact: any;

  private _unsubscribeAll: Subject<any>;

  constructor(private _chatService: ChatService) {
    this._unsubscribeAll = new Subject();
  }
  ngOnInit(): void {
    this._chatService.onContactSelected.pipe(takeUntil(this._unsubscribeAll)).subscribe((contact) => {
      this.contact = contact;
    });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
