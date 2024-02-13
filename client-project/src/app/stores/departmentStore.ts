import { PagingParams } from './../models/pagination';
import { makeAutoObservable, runInAction } from "mobx";
import { Department } from "../models/department";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid'
import { format } from "date-fns";
import { Pagination } from "../models/pagination";


export default class DepartmentStore {
    
    selectedDepartment: Department | undefined = undefined;
    departmentRegistry = new Map<string, Department>();
    pagination: Pagination | null = null;
    loadingInitial: boolean = false;
    loading: boolean = false;
    editMode: boolean = false;
    pagingParams: PagingParams = new PagingParams();

    get departmentsByDate() {
        return Array.from(this.departmentRegistry.values()).sort((a, b) => 
        this.parseCustomDate(a.lastUpdateDate ? a.lastUpdateDate: a.createDate) - this.parseCustomDate(b.lastUpdateDate ? b.lastUpdateDate: b.createDate));
    }
    
    constructor () {
        makeAutoObservable(this);
    }
    
    currentFormatedDate = (formatDate: string) : string  => {
        const currentDate = new Date();
        return format(currentDate, formatDate);
    }

    loadDepartments = async () => {
        this.setLoadingInitial(true);
        try {
            const result = await agent.departments.list(this.axiosParams);
            runInAction(()=> {
                result.data.forEach((dept) => {
                    this.departmentRegistry.set(dept.id, dept);
                })
                this.setPagination(result.pagination);
                this.setLoadingInitial(false)
            })
        } catch (error) {
            console.log(error);
            runInAction(()=> {
                this.setLoadingInitial(false)
            })
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString() );
        params.append('pageSize', this.pagingParams.pageSize.toString());

        return params;
    } 

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectDepartment = (id: string) => {
        this.selectedDepartment = this.departmentRegistry.get(id);
    }

    cancelSelectDepartment = () => {
        this.selectedDepartment = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectDepartment(id) : this.cancelSelectDepartment()
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createDepartment = async (department: Department) => {
        this.loading = true;
        department.id = uuid();
        department.createDate = this.currentFormatedDate('dd-MM-yyyy hh:mm aa');

        try {
            await agent.departments.create(department);
            runInAction(() => {
                this.departmentRegistry.set(department.id, department);
                this.selectedDepartment = undefined;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateDepartment = async (department: Department) => {
        this.loading = true;
        department.lastUpdateDate = this.currentFormatedDate('dd-MM-yyyy hh:mm aa');
        try {
            await agent.departments.update(department);
            runInAction(() => {
                this.departmentRegistry.set(department.id, department);
                this.selectedDepartment = undefined;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    deleteDepartment = async (id: string) => {
        this.loading = true;
        try {
            await agent.departments.delete(id);
            runInAction(() => {
                this.departmentRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    parseCustomDate = (dateString: string): number => {
        const [datePart, timePart, period] = dateString.split(' ');
        
        // Extract day, month, year, hours, and minutes
        const [day, month, year] = datePart.split('-');
        const [hours, minutes] = timePart.split(':');
        
        // Convert to 24-hour format if needed
        let parsedHours = parseInt(hours, 10);
        if (period.toLowerCase() === 'pm' && parsedHours < 12) {
            parsedHours += 12;
        }
        
        const formattedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parsedHours, parseInt(minutes));

        return formattedDate.getTime();
    };
}