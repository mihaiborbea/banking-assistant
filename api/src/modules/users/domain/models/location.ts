import { prop, Typegoose } from 'typegoose';

export class Location extends Typegoose {
  @prop()
  public country: string;

  @prop()
  public city: string;

  @prop()
  public postalCode: string;
}
