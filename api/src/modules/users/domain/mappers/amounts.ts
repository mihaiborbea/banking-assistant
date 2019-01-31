import { Injectable } from '@nestjs/common';
import { ModelType } from 'typegoose';

import { Types } from 'mongoose';
import { ICollection } from '../../../../modules/shared/interfaces';
import { CollectionFactory } from '../../../../modules/shared/mappers';
import { BaseEntityMapper } from '../../../../modules/shared/mappers';
import { Transaction, User } from '../models';

@Injectable()
export class AmountsMapper extends BaseEntityMapper<User> {
  protected collection: ModelType<User> & ICollection<User> = CollectionFactory.create(User);

  public async getAmountsByCriteria(userId: string, params: any): Promise<number> {
    const transactions = this.getTransactionsFiltered(
      (await this.collection.findOne({ _id: new Types.ObjectId(userId) }, 'transactions')).transactions,
      params
    );
    const amounts = this.getSum(transactions);
    return amounts;
  }

  public async getTransactionsByCriteria(userId: string, params: any): Promise<Transaction[]> {
    return this.getTransactionsFiltered(
      (await this.collection.findOne({ _id: new Types.ObjectId(userId) }, 'transactions')).transactions,
      params
    );
  }

  private getTransactionsFiltered(transactions: Transaction[], params: any): Transaction[] {
    return transactions
      .filter(t => t.category !== 'Salary')
      .filter(t => (params.category ? t.category === params.category : true))
      .filter(t => (params.start && params.end ? t.date >= params.start && t.date < params.end : true));
  }
  private getSum(transactions: Transaction[]): number {
    return Math.abs(transactions.map(t => t.amount).reduce((a, b) => a + b, 0));
  }
}
