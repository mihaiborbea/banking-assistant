import { Model } from ".";

export interface IEntityController<TModel extends Model> {
  create(): any;
  findOne(): any;
  findAll(): any;
  update(): any;
  delete(): any;
}