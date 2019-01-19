import { Injectable } from '@nestjs/common';
import { ModelType } from 'typegoose';

import { ICollection } from 'src/modules/shared/interfaces';
import { CollectionFactory } from 'src/modules/shared/mappers';
import { BaseEntityMapper } from 'src/modules/shared/mappers';
import { User } from '../models';

@Injectable()
export class UsersMapper extends BaseEntityMapper<User> {
  protected collection: ModelType<User> &
    ICollection<User> = CollectionFactory.create(User);
}
