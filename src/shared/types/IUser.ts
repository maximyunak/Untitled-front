export interface IUser {
  email: string;
  password: string;
  country: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string; // Добавлен знак вопроса, чтобы поле было необязательным
  preferences: string[];
}
