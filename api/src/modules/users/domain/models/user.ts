import { Types } from 'mongoose';
import { prop, Typegoose } from 'typegoose';

import { Account, Location, Product, Transaction } from '.';

export class User extends Typegoose {
  @prop()
  public _id: Types.ObjectId;

  /* Profile { */
  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true })
  public name: string;

  @prop()
  public avatar: string;

  @prop()
  public birthdate: Date;

  @prop()
  public gender: string;

  @prop()
  public about: string;

  @prop()
  public occupation: string;

  @prop()
  public skills: string;

  @prop()
  public phone: string;

  @prop()
  public location: Location;

  @prop({ minlength: 8, required: true })
  public password: string;
  /* }  */

  @prop()
  public products: Product[];

  @prop()
  public accounts: Account[];

  @prop()
  public transactions: Transaction[];
}
