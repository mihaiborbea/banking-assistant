import { Injectable } from '@nestjs/common';

import { BaseEntityService } from 'src/modules/shared/services';
import { MCCCatalog } from '../../../../assets/mcc_codes';
import { MCCMapper } from '../../domain/mappers';
import { MCC } from '../../domain/models';

@Injectable()
export class MCCService extends BaseEntityService<MCC> {
  constructor(protected readonly mapper: MCCMapper) {
    super();
    this.initCollection();
  }

  public async retrieveOne(code: string): Promise<MCC> {
    return this.mapper.retrieveOne(code);
  }

  public async saveMany(mccs: MCC[]): Promise<MCC[]> {
    return this.mapper.saveMany(mccs);
  }

  private async initCollection(): Promise<void> {
    await this.mapper.cleanCollection();
    const mccs = MCCCatalog.map(i => Object.assign(new MCC(), i));
    await this.mapper.saveMany(mccs);
  }
}
