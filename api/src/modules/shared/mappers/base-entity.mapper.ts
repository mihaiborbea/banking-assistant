import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ModelType } from 'typegoose';

import { ICollection, IEntityMapper } from '../interfaces';
import { Model } from '../models';

@Injectable()
export class BaseEntityMapper<TModel extends Model>
  implements IEntityMapper<TModel> {
  protected collection: ModelType<TModel> & ICollection<TModel>;

  public async save(data: TModel): Promise<TModel> {
    const model = new this.collection(data);
    if (!model._id) {
      model._id = Types.ObjectId();
    }
    return await model.save();
  }

  // TODO: change any type
  public async retrieve(criteria?: any): Promise<any> {
    return this.collection.find(criteria ? criteria : {});
  }

  public async retrieveOne(id: string): Promise<TModel> {
    if (this.isValidObjectId(id)) {
      return this.collection.findOne({ _id: new Types.ObjectId(id) });
    } else {
      throw new Error('Invalid ID');
    }
  }

  // TODO: add error handling on findOneAndUpdate
  public async update(data: TModel): Promise<TModel> {
    const { _id, ...model } = data as any;
    if (!this.isValidObjectId(_id)) {
      throw new Error('Invalid ID!');
    } else {
      const savedModel: any = await this.collection.findOneAndUpdate(
        { _id: new Types.ObjectId(_id) },
        { $set: model },
        { new: true }
      );
      return this.collection.mapDocumentToModel(savedModel);
    }
  }

  public async delete(id: string): Promise<boolean> {
    if (this.isValidObjectId(id)) {
      return this.collection.deleteOne({ _id: new Types.ObjectId(id) });
    } else {
      throw new Error('Invalid ID');
    }
  }

  protected isValidObjectId(postId: string): boolean {
    return /^[a-fA-F0-9]{24}$/.test(postId);
  }
}
