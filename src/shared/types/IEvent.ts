import { IComment } from './IComment';
import { IUser } from './IUser';

export interface IEvent {
  _id: number;
  country: string;
  title: string;
  description: string;
  eventTypes: string[];
  creator: IUser; // Ссылка на пользователя, который создал событие
  comments: IComment[]; // Массив комментариев
}
