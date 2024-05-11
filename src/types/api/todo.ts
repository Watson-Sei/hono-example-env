export interface Todo {
    id: number,
    title: string,
    description: string,
    isCompleted: boolean,
    creatorId: number,
    assigneeId: number,
    createdAt: string
}

export interface CreateRequestBody {
    title: string,
    description: string,
    assigneeId: number
}

export interface CreateTodoObject extends CreateRequestBody {
    creatorId: number
}

export interface UpdateRequestBody {
    id: number,
    title: string,
    description: string,
    isCompleted: boolean,
    creatorId: number,
    assigneeId: number | null
    createdAt: string
}