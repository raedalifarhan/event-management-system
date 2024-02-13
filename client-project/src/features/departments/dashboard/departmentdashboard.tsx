import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import DepartmentDetails from '../details/departmentDetails';
import DepartmentForm from '../form/departmentForm';
import BranchListGroup from './branchListGroup';
import DepartmentDataTable from './departmentDatatable';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/loadingComponent';

const DepartmentDashboard = () => {
    const { departmentStore, branchStore } = useStore();
    const {
        openForm,
        closeForm,
        editMode,
        selectedDepartment,
        departmentRegistry,
        loadDepartments,
        loadingInitial
    } = departmentStore;

    useEffect(() => {
        branchStore.loadBranches();
    }, [branchStore]);

    useEffect(() => {
        if (departmentRegistry.size <= 1) loadDepartments();
    }, [loadDepartments, departmentRegistry.size]);

    async function handleAddDepartment() {
        await closeForm();
        openForm();
    }

    if (loadingInitial)
        return (
            <LoadingComponent content="Loading app..." intverted={loadingInitial} />
        );

    return (
        <div className="flex flex-col justify-between lg:flex-row gap-5">
            <div className="w-full lg:w-1/3">
                <div className="flex flex-col gap-5">
                    {editMode && <DepartmentForm />}
                    {selectedDepartment && !editMode && <DepartmentDetails />}
                    <BranchListGroup />
                </div>
            </div>

            <div className="lg:w-2/3 w-full p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex gap-2 sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-3">
                    <button className="bg-blue-600 hover:bg-blue-800 text-yellow-50 rounded-md py-2 px-3 w-full lg:w-auto md:w-auto" onClick={handleAddDepartment}>
                        Add Department
                    </button>
                    <div className="flex items-center gap-1 overflow-auto">
                        <div>
                            <label className="sr-only ng-blue-">Search</label>
                            <div className="">
                                <input
                                    type="text"
                                    id="table-search"
                                    className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg lg:w-80 md:w-80 w-55 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search applied on name or description"
                                />
                            </div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-800 text-yellow-50 rounded-md py-2 px-3">Search</button>
                        <button className="bg-yellow-500 hover:bg-yellow-800 rounded-md py-2 px-3">Reset</button>
                    </div>
                </div>
                <DepartmentDataTable />
            </div>
        </div>
    );
};

export default observer(DepartmentDashboard);
