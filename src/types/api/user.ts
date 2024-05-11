export interface CreateRequestBody {
    username: string,
    password: string
}

export interface User {
    id?: number,
    username: string,
    passwordHash: string
}