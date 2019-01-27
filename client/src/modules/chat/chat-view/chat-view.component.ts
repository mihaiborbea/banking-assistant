import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

import { Message } from '../domain/message.interface';
import { AssistantService } from '../assistant.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit, OnDestroy {
  @ViewChild(FusePerfectScrollbarDirective)
  public directiveScroll: FusePerfectScrollbarDirective;

  public dialog: Message[] = [];
  public form: FormGroup = new FormGroup({
    chatInput: new FormControl('', [Validators.required])
  });

  private _unsubscribeAll: Subject<any>;

  constructor(private _assistantService: AssistantService) {
    this._unsubscribeAll = new Subject();
    this.dialog = [{ owner: 'bot', text: 'Hello there!', date: new Date() }];
  }

  public ngOnInit(): void {
    this._assistantService.onBotResponded.pipe(takeUntil(this._unsubscribeAll)).subscribe((message) => {
      if (message) {
        this.dialog.push(message);
      }
    });
  }

  public ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  public async sendMessage(): Promise<void> {
    if (this.form.controls.chatInput.value) {
      this.dialog.push({ owner: 'user', text: this.form.controls.chatInput.value, date: new Date() });
      this._assistantService.sendQuery(this.form.controls.chatInput.value);
      this.form.reset();
      this.form.controls.chatInput.clearValidators();
      this.form.controls.chatInput.updateValueAndValidity();
      this.scrollToBottom();
    }
  }

  private scrollToBottom(speed?: number): void {
    speed = speed || 400;
    if (this.directiveScroll) {
      this.directiveScroll.update();

      setTimeout(() => {
        this.directiveScroll.scrollToBottom(0, speed);
      });
    }
  }
}
