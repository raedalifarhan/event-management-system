export interface Response<T> {
    value: T;
    error: string;
    isSuccess: boolean;
}