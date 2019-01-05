import { Types } from 'mongoose';
import { prop, Typegoose } from 'typegoose';

export class User extends Typegoose {
  @prop()
  public _id: Types.ObjectId;

  @prop()
  public email: string;

  @prop()
  public firstName: string;

  @prop()
  public lastName: string;

  @prop()
  public password: string;
}
