import { Model } from "../models";

export interface IEntityMapper<TModel extends Model> {
  save(model: TModel): Promise<TModel>;
  // TODO: change any type
  retrieve(criteria: any): Promise<any>;
  retrieveOne(id: string): Promise<TModel>;
  update(model: TModel): Promise<TModel>;
  delete(id: string): Promise<boolean>;
}