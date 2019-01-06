import { Model } from ".";

export interface IEntityService<TModel extends Model> {
  create(input: any): Promise<TModel>;
  retrieveOne(id: string): Promise<TModel | undefined>;
  retrieve(criteria?: any): Promise<any>;
  update(model: any): Promise<TModel>;
  delete(id: string): Promise<boolean>;
}