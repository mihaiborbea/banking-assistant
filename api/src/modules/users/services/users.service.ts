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

  // TODO: validate email
  public async retrieveOneByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    return this.mapper.retrieveOneByCriteria({ email, password });
  }
}
