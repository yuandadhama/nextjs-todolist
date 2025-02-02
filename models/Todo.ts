export interface Todo extends Document {
  userId: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}
