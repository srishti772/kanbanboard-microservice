import { ITask } from "./task.interface";
import { IUser } from "./user.interface";

export interface IEntity {
    action: string;
    task: ITask;
    owner: IUser;
  }
  