import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Types } from 'mongoose';
import { ModelType } from 'typegoose';

import { generateTransactions } from '../../../../assets/transactions-seeder';
import { ICollection } from '../../../../modules/shared/interfaces';
import { CollectionFactory } from '../../../../modules/shared/mappers';
import { BaseEntityMapper } from '../../../../modules/shared/mappers';
import { Account, PaginatedItems, PaginationMeta, Transaction, User } from '../models';
import { PaginationCriteria } from '../models/pagination-criteria';

@Injectable()
export class UsersMapper extends BaseEntityMapper<User> {
  protected collection: ModelType<User> & ICollection<User> = CollectionFactory.create(User);

  public async retrieve(criteria?: any): Promise<any> {
    return this.collection.find(criteria ? criteria : {}, { transactions: 0 });
  }
  public async retrieveOnesAccounts(id: string): Promise<Account[]> {
    if (this.isValidObjectId(id)) {
      const users = await this.collection.findOne({ _id: new Types.ObjectId(id) }, 'accounts');
      return users.accounts;
    } else {
      // tslint:disable-next-line:no-duplicate-string
      throw new Error('Invalid ID');
    }
  }

  public async retrieveOnesTransactions(
    id: string,
    criteria: PaginationCriteria
  ): Promise<PaginatedItems<Transaction> | any> {
    if (this.isValidObjectId(id)) {
      return !criteria.aggregate
        ? await this.retrieveTransactionsPaginated(id, criteria.page, criteria.count)
        : await this.retrieveTransactionsAggregated(id, criteria.aggregate);
    } else {
      throw new Error('Invalid ID');
    }
  }

  public async provisionOne(id: string): Promise<User> {
    if (this.isValidObjectId(id)) {
      const transactions = generateTransactions();
      const account = Object.assign(new Account(), {
        name: 'Main',
        balance: transactions.map(m => m.amount).reduce((a, b) => a + b),
        currency: 'RON',
        main: true
      });
      // tslint:disable-next-line:max-line-length
      return await this.collection.findOneAndUpdate(
        { _id: new Types.ObjectId(id) },
        { $set: { accounts: [account], transactions } }
      );
    } else {
      throw new Error('Invalid ID');
    }
  }

  private async retrieveTransactionsAggregated(id: string, aggregation: string): Promise<any> {
    const prevMonth = moment()
      .subtract(1, 'month')
      .date(1)
      .hours(0)
      .minutes(0)
      .seconds(0)
      .toDate();
    const currentMonth = moment()
      .date(1)
      .hours(0)
      .minutes(0)
      .seconds(0)
      .toDate();
    const user = await this.collection.findOne({ _id: new Types.ObjectId(id) }, 'transactions');
    const previous = user.transactions
      .filter(t => t.date >= prevMonth && t.date < currentMonth)
      .map(t => ({ date: t.date, amount: t.amount }));
    const current = user.transactions
      .filter(t => t.date >= currentMonth)
      .map(t => ({ date: t.date, amount: t.amount }));
    return { previous, current };
  }

  private async retrieveTransactionsPaginated(
    id: string,
    page: number,
    count: number
  ): Promise<PaginatedItems<Transaction>> {
    const user = await this.collection.findOne({ _id: new Types.ObjectId(id) }, 'transactions');
    const start = page * count;
    let temp = page;
    const end = ++temp * count;
    const transactions = user.transactions.slice(start, end);
    return new PaginatedItems<Transaction>(transactions, new PaginationMeta(user.transactions.length, page, count));
  }
}
