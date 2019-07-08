export type Todo = Readonly<{
  id: number;
  text: string;
  done: boolean;
}>;

export type TodoState = Readonly<{
  todos: Todo[];
}>;
