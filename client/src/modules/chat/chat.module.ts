import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ChatService } from './chat.service';
import { ChatComponent } from './chat.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { ChatRightSidenavComponent } from './sidenavs/right/right.component';

const routes: Routes = [
  {
    path: '**',
    component: ChatComponent,
    resolve: {
      chat: ChatService
    }
  }
];

@NgModule({
  declarations: [ChatComponent, ChatViewComponent, ChatRightSidenavComponent],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,

    FuseSharedModule
  ],
  providers: [ChatService]
})
export class ChatModule {}
