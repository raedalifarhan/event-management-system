import { PaginatedResult, PagingParams } from '@/types/PaginationType';
import { Branch } from '@/types/branchTypes';
import { Company, CompanyDetailedView, CompanyFormType, CompanyParams } from '@/types/companiesTypes';
import { User } from '@/types/userTypes';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { FieldValues } from 'react-hook-form';

axios.defaults.baseURL = 'http://localhost:7000/api';

axios.interceptors.response.use(response => {
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination))

        return response as AxiosResponse<PaginatedResult<any>>

    }
    return response
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string, config?: AxiosRequestConfig<any>) =>
        axios.get<T>(url, config).then(responseBody),

    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Companies = {
    list: (params: URLSearchParams) =>
        requests.get<PaginatedResult<Company[]>>(`/companies`, { params }),

    details: (id: string) => requests.get<CompanyDetailedView>(`/companies/${id}`),
    create: (data: FieldValues) => requests.post<string>('/companies', data),
    update: (id: string, data: FieldValues) => requests.put<void>(`/companies/${id}`, data),
    delete: (id: string) => requests.del<void>(`/companies/${id}`),
}

const Branches = {
    list: () => requests.get<Branch[]>("/branches")
}

const Account = {
    current : () => requests.get<User>('/account'),
    login   : (data: FieldValues) => requests.post<string>('/account/login', data),
    register: (data: FieldValues) => requests.post<string>('/account/register', data),
}

const agent = {
    Companies,
    Branches,
    Account,
}

export default agent;