export interface Message {
  owner: 'user' | 'bot';
  text: string;
  date: Date;
}
