import { ModelType } from "typegoose";
import { Injectable } from "@nestjs/common";

import { User } from "../models";
import { ICollection } from "src/modules/shared/interfaces";
import { CollectionFactory } from "src/modules/shared/mappers";
import { BaseEntityMapper } from "src/modules/shared/mappers";

@Injectable()
export class UserMapper extends BaseEntityMapper<User>{
  protected collection: ModelType<User> & ICollection<User> = CollectionFactory.create(User);

}