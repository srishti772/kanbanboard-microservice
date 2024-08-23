export interface TaskSummary {
    [status: string]: {
      High?: number;
      Medium?: number;
      Low?: number;
    };
  }
  

  export interface UserSummary {
    [userId: string]: {
      [status: string]: {
        High?: number;
        Medium?: number;
        Low?: number;
      };
    };
  }

  export interface ChartDataset {
    label: string;
    data: number[];
    backgroundColor: string;
  }
  