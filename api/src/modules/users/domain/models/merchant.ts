import { prop, Typegoose } from 'typegoose';

export class Merchant extends Typegoose {
  @prop()
  public name: string;

  @prop()
  public logo: string;
}
