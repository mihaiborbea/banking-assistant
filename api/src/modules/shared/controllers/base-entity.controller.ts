import { Model, IEntityService } from "../interfaces";
import { IEntityController } from "../interfaces/ientity-controller";

export class BaseEntityController<TModel extends Model> implements IEntityController<TModel> {
  protected service: IEntityService<TModel>;

  public create(): any {
    return 'Not implemented!';
  }
  public findOne(): any {
    return 'Not implemented!';
  }
  public findAll(): any {
    return 'Not implemented!';
  }
  public update(): any {
    return 'Not implemented!';
  }
  public delete(): any {
    return 'Not implemented!';
  }
}