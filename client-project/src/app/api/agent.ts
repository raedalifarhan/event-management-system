import { toast } from 'react-toastify';
import { BranchKeyValue } from '../models/branch';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';
import { Department } from './../models/department';
import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from '../router/Routes';
import { PaginatedResult } from '../models/pagination';

const sleepFun = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:7000/api/';

axios.interceptors.response.use(async response => {
    await sleepFun(1000);
    const pagination = response.headers['pagination'];
    
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
    
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found')
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key])
                    {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                toast.error('bad request');
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 403:
            toast.error('forbidden');
            break;
        case 404:
            router.navigate('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }

    Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const branches = {
    list: () => requests.get<PaginatedResult<BranchKeyValue[]>>("branches/branchesKeyValue")
}

const departments = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Department[]>>('/departments', {params}).then(responseBody),
    details: (id: string) => requests.get<Department>(`/departments/${id}`),
    create: (department: Department) => requests.post<void>('/departments', department),
    update: (department: Department) => requests.put<void>(`/departments/${department.id}`, department),
    delete: (id: string) => requests.del<void>(`/departments/${id}`),
}

const account = {
    current: () => requests.get<User>('/account/GetCurrentUser'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
}

const agent = {
    branches,
    departments,
    account,
}

export default agent;
