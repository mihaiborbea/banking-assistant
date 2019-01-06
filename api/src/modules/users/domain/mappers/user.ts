import { ModelType } from "typegoose";
import { Injectable } from "@nestjs/common";

import { User } from "../models";
import { ICollection } from "src/modules/shared/interfaces/icollection";
import { CollectionFactory } from "src/modules/shared/mappers/collection.factory";

@Injectable()
export class UserMapper {
  protected collection: ModelType<User> & ICollection<User> = CollectionFactory.create(User);

}