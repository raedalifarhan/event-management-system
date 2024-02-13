export interface User {
    diplayName: string;
    email: string;
    username: string;
    token?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}