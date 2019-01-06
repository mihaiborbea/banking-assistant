import { Injectable } from "@nestjs/common";

import { Model, IEntityService, IEntityMapper } from "../interfaces";

@Injectable()
export class BaseEntityService<TModel extends Model> implements IEntityService<TModel> {
  protected mapper: IEntityMapper<TModel>;

  public async create(model: TModel): Promise<TModel> {
    return this.mapper.save(model);
  }
  public async retrieve(criteria?: any): Promise<any> {
    return this.mapper.retrieve(criteria);
  }

  public async retrieveOne(id: string): Promise<TModel> {
    const item = await this.mapper.retrieveOne(id);
    if (!item) {
      throw new Error("TModel doesn't exist!");
    }
    return item;
  }

  public async update(model: TModel): Promise<TModel> {
    return this.mapper.update(model);
  }

  public async delete(id: string): Promise<boolean> {
    return this.mapper.delete(id);
  }
}