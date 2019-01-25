import { prop, Typegoose } from 'typegoose';

import { Merchant } from './merchant';

export class Transaction extends Typegoose {
  @prop()
  public merchant: Merchant;

  @prop()
  public amount: number;

  @prop()
  public date: Date;

  @prop()
  public accountName: string;

  @prop()
  public category: string;
}
