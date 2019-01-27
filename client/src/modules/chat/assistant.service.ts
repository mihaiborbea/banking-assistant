import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'modules/auth/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Message } from './domain/message.interface';

@Injectable()
export class AssistantService {
  public onBotResponded: BehaviorSubject<any> = new BehaviorSubject(null);

  private readonly baseURL: string = 'https://api.dialogflow.com/v1/query?v=20150910';
  private readonly dialogflowToken: string = environment.dialogflowToken;

  constructor(private readonly _http: HttpClient, private readonly _authService: AuthService) {}

  public async sendQuery(query: string): Promise<any> {
    const data = {
      query: query,
      lang: 'en',
      sessionId: this._authService.getUserAuthData()._id
    };
    return new Promise((resolve, reject) => {
      this._http
        .post(this.baseURL, data, { headers: { Authorization: `Bearer ${this.dialogflowToken}` } })
        .subscribe((response) => {
          if (response) {
            this.onBotResponded.next(this.extractMessage(response));
          }
          resolve();
        }, reject);
    });
  }

  private extractMessage(data: any): Message {
    return { owner: 'bot', date: data.timestamp, text: data.result.fulfillment.messages[0].speech };
  }
}
