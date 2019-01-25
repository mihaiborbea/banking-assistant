import { Injectable } from '@nestjs/common';

import { BaseEntityService } from 'src/modules/shared/services';
import { UsersMapper } from '../domain/mappers';
import { User } from '../domain/models';

@Injectable()
export class UsersService extends BaseEntityService<User> {
  constructor(protected readonly mapper: UsersMapper) {
    super();
  }

  // TODO: validate email
  public async retrieveOneByEmail(email: string): Promise<User> {
    return this.mapper.retrieveOneByCriteria({ email });
  }

  public async retrieveOnesTransactions(id: string): Promise<User> {
    const item = await this.mapper.retrieveOnesTransactions(id);
    if (!item) {
      throw new Error("User doesn't exist!");
    }
    return item;
  }

  public async provisionOne(id: string): Promise<User> {
    const item = await this.mapper.provisionOne(id);
    if (!item) {
      throw new Error("User doesn't exist!");
    }
    return item;
  }
}
