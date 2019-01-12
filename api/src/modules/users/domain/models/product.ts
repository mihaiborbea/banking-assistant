import { prop, Typegoose } from 'typegoose';

export class Product extends Typegoose {
  @prop()
  public name: string;
}
