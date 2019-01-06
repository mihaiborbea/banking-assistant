import { ModelType } from "typegoose";
import { Injectable } from "@nestjs/common";

import { User } from "../models";

@Injectable()
export class UserMapper {
  protected user: ModelType<User> = new User().getModelForClass(User);

}