import { Types } from 'mongoose';
import { prop, Typegoose } from 'typegoose';

export class MCC extends Typegoose {
  @prop()
  public _id: Types.ObjectId;

  @prop({ required: true, unique: true })
  public code: string;

  @prop()
  public description: string;

  @prop()
  public category: string;
}
