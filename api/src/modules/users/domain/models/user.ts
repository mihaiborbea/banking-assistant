import { Types } from 'mongoose';
import { prop, Typegoose } from 'typegoose';

import { Account, Product, Transaction } from '.';

export class User extends Typegoose {
  @prop()
  public _id: Types.ObjectId;

  /* Profile { */
  @prop({ unique: true })
  public email: string;

  @prop()
  public firstName: string;

  @prop()
  public lastName: string;

  @prop({ minlength: 8 })
  public password: string;
  /* }  */

  @prop()
  public products: Product[];

  @prop()
  public accounts: Account[];

  @prop()
  public transactions: Transaction[];
}
