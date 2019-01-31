import { Injectable } from '@nestjs/common';

import { BaseEntityService } from '../../../modules/shared/services';
import { UsersMapper } from '../domain/mappers';
import { PaginatedItems, Transaction, User } from '../domain/models';
import { PaginationCriteria } from '../domain/models/pagination-criteria';

import { Account } from '../domain/models';

@Injectable()
export class UsersService extends BaseEntityService<User> {
  constructor(protected readonly mapper: UsersMapper) {
    super();
  }

  // TODO: validate email
  public async retrieveOneByEmail(email: string): Promise<User> {
    return this.mapper.retrieveOneByCriteria({ email });
  }

  public async retrieveOnesAccounts(id: string): Promise<Account[]> {
    const items = await this.mapper.retrieveOnesAccounts(id);
    if (!items) {
      throw new Error('User has now transactions');
    }
    return items;
  }

  public async retrieveOnesTransactions(
    id: string,
    criteria: PaginationCriteria
  ): Promise<PaginatedItems<Transaction> | any> {
    const items = await this.mapper.retrieveOnesTransactions(id, criteria);
    if (!items) {
      throw new Error('User has now transactions');
    }
    return items;
  }

  public async provisionOne(id: string): Promise<User> {
    const item = await this.mapper.provisionOne(id);
    if (!item) {
      throw new Error("User doesn't exist!");
    }
    return item;
  }
}
