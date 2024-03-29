import { Location } from '.';

export class User {
  public _id: string;

  public email: string;

  public name: string;

  public avatar: string;

  public birthdate: Date;

  public gender: string;

  public about: string;

  public occupation: string;

  public skills: string;

  public phone: string;

  public location: Location;

  public password: string;

  // public products: Product[];

  // public accounts: Account[];

  // public transactions: Transaction[];

  public get fullLocation(): string {
    if (!this.location) {
      return '-';
    }
    if (!this.location.country) {
      return '-';
    }
    if (!this.location.city) {
      return '-';
    }
    if (!this.location.postalCode) {
      return '-';
    }
    return `${this.location.country}, ${this.location.city}, ${this.location.postalCode}`;
  }
}
