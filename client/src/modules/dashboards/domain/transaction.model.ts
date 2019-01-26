import { Merchant } from '.';

export class Transaction {
  public merchant: Merchant;
  public amount: number;
  public date: Date;
  public accountName: string;
  public category: string;
}
