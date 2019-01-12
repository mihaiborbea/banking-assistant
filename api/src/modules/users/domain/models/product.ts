import { prop, Typegoose } from 'typegoose';

export class Product extends Typegoose {
  @prop({ unique: true })
  public name: string;
}
