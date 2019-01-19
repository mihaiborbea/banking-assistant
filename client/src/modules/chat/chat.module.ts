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
import { ChatStartComponent } from './chat-start/chat-start.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { ChatChatsSidenavComponent } from './sidenavs/left/chats/chats.component';
import { ChatUserSidenavComponent } from './sidenavs/left/user/user.component';
import { ChatLeftSidenavComponent } from './sidenavs/left/left.component';
import { ChatRightSidenavComponent } from './sidenavs/right/right.component';
import { ChatContactSidenavComponent } from './sidenavs/right/contact/contact.component';

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
    declarations: [
        ChatComponent,
        ChatViewComponent,
        ChatStartComponent,
        ChatChatsSidenavComponent,
        ChatUserSidenavComponent,
        ChatLeftSidenavComponent,
        ChatRightSidenavComponent,
        ChatContactSidenavComponent
    ],
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
