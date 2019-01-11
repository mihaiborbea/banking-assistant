import { prop, Typegoose } from 'typegoose';

export class MCC extends Typegoose {
  @prop({ required: true, unique: true })
  public code: string;

  @prop()
  public description: string;

  @prop()
  public category: string;
}
