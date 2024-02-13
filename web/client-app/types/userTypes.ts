
export interface UserFormValues
{
    displayName: string
    username: string
    email: string
    password: string
    branchId?: string
}

export interface User
{
    displayName: string
    username: string
    token: string
}