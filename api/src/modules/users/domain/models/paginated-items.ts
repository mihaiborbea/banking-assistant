import { PaginationMeta } from '.';

export class PaginatedItems<T> {
  constructor(public items: T[], public meta?: PaginationMeta) {}
}
