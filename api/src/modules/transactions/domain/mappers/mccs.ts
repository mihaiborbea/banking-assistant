import { Injectable } from '@nestjs/common';
import { ModelType } from 'typegoose';

import { ICollection } from 'src/modules/shared/interfaces';
import { BaseEntityMapper, CollectionFactory } from 'src/modules/shared/mappers';
import { MCC } from '../models';

@Injectable()
export class MCCMapper extends BaseEntityMapper<MCC> {
  protected collection: ModelType<MCC> & ICollection<MCC> = CollectionFactory.create(MCC);

  public async retrieveOne(code: string): Promise<MCC> {
    return this.collection.findOne({ code });
  }

  public async saveMany(mccs: MCC[]): Promise<MCC[]> {
    const savedMccs: MCC[] = await this.collection.insertMany(mccs);
    return this.collection.mapDocumentsToModels(savedMccs);
  }

  public async cleanCollection(): Promise<void> {
    await this.collection.remove({});
  }
}
