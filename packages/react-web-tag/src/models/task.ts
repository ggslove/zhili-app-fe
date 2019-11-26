export interface ITask {
  name: string;
  taskHistory: { name: string }[];
  isExpand: boolean;
  pagination: IPage;
}

export interface ILeftData {
  name: string;
  pagination: IPage;
  taskList: ITask[];
}

export interface IPage {
  current: number;
  total: number;
  pageSize: number;
}
