import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ModelType } from 'typegoose';

import { generateTransactions } from 'src/assets/transactions-seeder';
import { ICollection } from 'src/modules/shared/interfaces';
import { CollectionFactory } from 'src/modules/shared/mappers';
import { BaseEntityMapper } from 'src/modules/shared/mappers';
import { Account, User } from '../models';

@Injectable()
export class UsersMapper extends BaseEntityMapper<User> {
  protected collection: ModelType<User> & ICollection<User> = CollectionFactory.create(User);

  public async retrieve(criteria?: any): Promise<any> {
    return this.collection.find(criteria ? criteria : {}, { transactions: 0 });
  }

  public async retrieveOnesTransactions(id: string): Promise<User> {
    if (this.isValidObjectId(id)) {
      return this.collection.findOne({ _id: new Types.ObjectId(id) }, 'transactions');
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
      return await this.collection.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: { accounts: [account], transactions } });
    } else {
      throw new Error('Invalid ID');
    }
  }
}
