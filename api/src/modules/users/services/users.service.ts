import { Injectable } from "@nestjs/common";

import { BaseEntityService } from "src/modules/shared/services";
import { User } from "../domain/models";
import { UsersMapper } from "../domain/mappers";

@Injectable()
export class UsersService extends BaseEntityService<User> {
  constructor(protected readonly mapper: UsersMapper) {
    super();
  }
}