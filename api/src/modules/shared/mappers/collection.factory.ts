export class CollectionFactory<T> {
  public static create<T>(type: T): any {
    const o = { type };
    const obj = new (o.type as any)().getModelForClass(o.type);

    const originals = {
      find: obj.find,
      findOne: obj.findOne,
      save: obj.save
    };

    return Object.assign(obj, {
      // async find(...args: any[]): Promise<any> {
      //   return this.mapDocumentsToModels(await originals.find.apply(obj, args));
      // },
      // async findOne(...args: any[]): Promise<any> {
      //   return this.mapDocumentToModel(await originals.findOne.apply(obj, args));
      // },
      async save(...args: any[]): Promise<any> {
        return this.mapDocumentToModel(await originals.save.apply(obj, args));
      },
      getNewModel(): T {
        return new (o.type as any)();
      },
      mapDocumentsToModels(docs: any[]): T[] {
        return docs.map(this.mapDocumentToModel);
      },
      mapDocumentToModel(doc: any): T {
        return doc && doc.toObject ? Object.assign(new (o.type as any)(), doc.toObject()) : doc;
      }
    });
  }
}
