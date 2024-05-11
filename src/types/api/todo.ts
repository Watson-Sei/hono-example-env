export interface Todo {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    creator: string;
    assignee?: string
}

export interface CreateTodoRequest {
    title: string;
    description: string;
    creator: string;
    assignnee?: string;
}