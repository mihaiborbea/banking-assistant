import { Types } from 'mongoose';
import { prop, Typegoose } from 'typegoose';

export class User extends Typegoose {
  @prop()
  public _id: Types.ObjectId;

  @prop({ unique: true })
  public email: string;

  @prop()
  public firstName: string;

  @prop()
  public lastName: string;

  @prop({ minlength: 8 })
  public password: string;
}
