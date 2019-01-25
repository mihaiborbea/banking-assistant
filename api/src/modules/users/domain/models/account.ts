import { prop, Typegoose } from 'typegoose';

export class Account extends Typegoose {
  @prop({ unique: true })
  public name: string;

  @prop()
  public balance: number;

  @prop()
  public currency: string;

  @prop()
  public main: boolean;
}
