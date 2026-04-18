export type Priority = "low" | "medium" | "high";

export type Todo = {
  _id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: Date | string; 
  updatedAt?: Date | string;
};

export type createTodoInput = {
  title: string;
  priority: Priority;
  completed?: boolean;
};

export type updateTodoInput = {
  title?: string;
  completed?: boolean;
  priority?: Priority;
};
