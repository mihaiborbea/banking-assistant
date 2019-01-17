export interface ICollection<T> {
  getNewModel(): T;
  mapDocumentToModel(doc: any): T;
  mapDocumentsToModels(docs: any[]): T[];
}
