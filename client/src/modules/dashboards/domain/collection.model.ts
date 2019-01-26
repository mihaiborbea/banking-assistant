import { CollectionMeta } from '.';

export class Collection<T> {
  constructor(public items: T[], public meta?: CollectionMeta) {}
}
