import { Injectable } from "@nestjs/common";

import { BaseEntityService } from "src/modules/shared/services";
import { User } from "../domain/models";

@Injectable()
export class UsersService extends BaseEntityService<User> {}