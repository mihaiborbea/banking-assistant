import { Injectable } from '@nestjs/common';

import moment = require('moment');
import { BaseEntityService } from '../../../modules/shared/services';
import { AmountsMapper, UsersMapper } from '../domain/mappers';
import { ChatResponse, User } from '../domain/models';

@Injectable()
export class ChatService extends BaseEntityService<User> {
  constructor(protected readonly mapper: UsersMapper, protected readonly amountsMapper: AmountsMapper) {
    super();
  }

  public async getResponse(userId: string, intentName: string, queryParams: any): Promise<ChatResponse> {
    if (intentName === 'Amounts') {
      return await this.getAmountsResponse(userId, queryParams);
    }
    if (intentName === 'Transactions') {
      return await this.getTransactionsResponse(userId, queryParams);
    }
    if (intentName === 'Cards') {
      return await this.getCardsResponse(userId, queryParams);
    }
  }

  protected async getCardsResponse(userId: string, queryParams: any): Promise<ChatResponse> {
    const cleanParams = this.getAmountAndCardsParams(queryParams);
    const succeed = await this.mapper.transferMoneyBetweenAccounts(userId, cleanParams.amount, [
      cleanParams.firstAcc,
      cleanParams.secondAcc
    ]);
    if (succeed) {
      return Promise.resolve({ type: 0, speech: 'Transfer succeded. Check your accounts!' });
    }
    return Promise.resolve({
      type: 0,
      speech: 'Transfer failed. Please check your balance and the accounts you provided.'
    });
  }

  protected async getAmountsResponse(userId: string, queryParams: any): Promise<ChatResponse> {
    const cleanParams = this.cleanQueryParams(queryParams);
    const amounts = await this.amountsMapper.getAmountsByCriteria(userId, cleanParams);
    const resp = this.buildAmountsResponse(amounts, queryParams);
    return resp;
  }

  protected async getTransactionsResponse(userId: string, queryParams: any): Promise<ChatResponse> {
    const cleanParams = this.cleanQueryParams(queryParams);
    const transactions = await this.amountsMapper.getTransactionsByCriteria(userId, cleanParams);
    const resp = transactions
      .map(t => `${Math.abs(t.amount)} RON to ${t.merchant.name} on ${moment(t.date).format('L')}`)
      .join(',');
    return Promise.resolve({ type: 0, speech: resp });
  }

  private buildAmountsResponse(amounts: number, params: any): ChatResponse {
    let speech = `${this.getRelativeDate(params)} you spent ${amounts} RON`;
    speech = params.category ? speech + ` on ${params.category}` : speech;
    return { type: 0, speech };
  }

  private cleanQueryParams(params: any): any {
    const cleanParams: any = {};
    if (params.date) {
      cleanParams.start = moment(params.date)
        .hours(0)
        .minutes(0)
        .seconds(0)
        .toDate();
      cleanParams.end = moment(params.date)
        .hours(23)
        .minutes(59)
        .seconds(59)
        .toDate();
    }
    // tslint:disable-next-line:no-duplicate-string
    if (params['date-period']) {
      cleanParams.start = moment(params['date-period'].split('/')[0])
        .hours(0)
        .minutes(59)
        .seconds(59)
        .toDate();
      cleanParams.end = moment(params['date-period'].split('/')[1])
        .hours(0)
        .minutes(0)
        .seconds(0)
        .toDate();
    }
    if (params.category === '') {
      cleanParams.category = null;
    } else {
      cleanParams.category = params.category;
    }
    return cleanParams;
  }

  private getRelativeDate(data: any): any {
    if (data.date) {
      return moment(data.date).calendar();
    }
    if (data['date-period']) {
      return `Between ${data['date-period'].split('/')[0]} and ${data['date-period'].split('/')[1]}`;
    }
  }

  private getAmountAndCardsParams(params: any): any {
    const resp: any = {};
    resp.amount = params['unit-currency'].amount;
    resp.firstAcc = params.card[0] ? params.card[0].split(' ')[0] : null;
    resp.secondAcc = params.card[1] ? params.card[1].split(' ')[0] : null;
    return resp;
  }
}
