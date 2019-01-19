import { prop, Typegoose } from 'typegoose';

export class Account extends Typegoose {
  @prop({ unique: true })
  public iban: string;

  @prop()
  public balance: number;

  @prop()
  public currency: string;

  @prop()
  public type: string;
}
