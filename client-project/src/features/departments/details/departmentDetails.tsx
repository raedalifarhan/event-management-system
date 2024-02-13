import { observer } from "mobx-react-lite";
import { Department } from "../../../app/models/department";
import { useStore } from "../../../app/stores/store";
import { IoIosClose } from "react-icons/io";

const DepartmentDetails = () => {

    const { departmentStore } = useStore();
    const { openForm, cancelSelectDepartment, selectedDepartment: department } = departmentStore;

    return (
        <div className="w-full p-6 bg-white  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">

            <div className="overflow-hidden mb-5">

                <h2 className="text-3xl font-bold mb-6">{department?.departmentName}</h2>
                <hr />
                <div className="grid grid-cols-2 gap-6 my-5">
                    <div className="col-span-2 sm:col-span-1">
                        <p className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">Branch Name:</p>
                        <p className="text-gray-800 font-semibold">{department?.branchName}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <p className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">Created Date:</p>
                        <p className="text-gray-800 font-semibold">{department?.createDate}</p>
                    </div>
                </div>
                <hr />
                <div className="grid grid-cols-2 gap-6 my-5">
                    <div className="col-span-2 sm:col-span-1">
                        <p className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">Last Update Date:</p>
                        <p className="text-gray-800 font-semibold">{department?.lastUpdateDate}</p>
                    </div>
                </div>
                <hr />
                <div className="col-span-2 sm:col-span-1 py-5">
                    <p className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">Description:</p>
                    <p className="text-gray-800 font-semibold">{department?.description || 'N/A'}</p>
                </div>
            </div>


            <a href="#" className=" mr-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg 
            hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 
            dark:focus:ring-blue-800" onClick={() => (openForm(department?.id))}>
                Edit
            </a>

            <button
                type="button"
                onClick={() => cancelSelectDepartment()}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
            >
                Cancel
                <IoIosClose className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
            </button>

        </div>
    )
}

export default observer(DepartmentDetails);