import { Injectable } from '@nestjs/common';

import { BaseEntityService } from 'src/modules/shared/services';
import { UsersMapper } from '../domain/mappers';
import { User } from '../domain/models';

@Injectable()
export class UsersService extends BaseEntityService<User> {
  constructor(protected readonly mapper: UsersMapper) {
    super();
  }
}
