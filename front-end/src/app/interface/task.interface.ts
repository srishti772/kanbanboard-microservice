export interface ITask {
  _id?: string;
  title: string;
  description?: string;
  status: 'Draft' | 'In Progress' | 'Completed'; // Make sure these literals match your data
  priority: 'High' | 'Medium' | 'Low';
  owner?: string;
  dueDate?: Date;
}
