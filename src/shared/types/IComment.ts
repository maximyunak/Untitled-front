import { IEvent } from './IEvent';
import { IUser } from './IUser';

export interface IComment {
  _id: string;
  email: string;
  commentBody: string;
  eventId: IEvent; // Измените тип на IEvent
  creator: IUser; // Измените тип на IUser
}
