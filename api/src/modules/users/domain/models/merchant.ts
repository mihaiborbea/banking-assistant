import { prop, Typegoose } from 'typegoose';

export class Merchant extends Typegoose {
  @prop({ unique: true })
  public name: string;

  @prop()
  public logo: string;
}
