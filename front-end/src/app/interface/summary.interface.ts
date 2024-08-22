export interface TaskSummary {
    [status: string]: {
      High?: number;
      Medium?: number;
      Low?: number;
    };
  }
  