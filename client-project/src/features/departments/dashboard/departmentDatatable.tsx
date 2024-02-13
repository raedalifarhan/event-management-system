import { observer } from "mobx-react-lite";
import { Department } from "../../../app/models/department"
import { useStore } from "../../../app/stores/store";
import DepartmentDatatableRow from "./departmentDatatableRow"
import Pagination from "../../../app/common/Pagination";
import { PagingParams } from "../../../app/models/pagination";
//import { useState } from "react";

const DepartmentDataTable = () => {

    const { departmentStore } = useStore();
    const { departmentsByDate, pagination, setPagingParams, loadDepartments } = departmentStore;

    const handlePageChange = (pageNumber: number) => {
        setPagingParams(new PagingParams(pageNumber));
        loadDepartments();
    };

    return (
        <div className="overflow-x-auto overflow-y-auto sm:overflow-y-hidden">
            <table
                className="w-full border-collapse border border-slate-400 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 border border-slate-300">
                            <a className="flex items-center">
                                Department Name
                                <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg></a>
                        </th>
                        <th scope="col" className="px-6 py-3 border border-slate-300">
                            <a className="flex items-center">
                                Description
                                <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg></a>
                        </th>
                        <th scope="col" className="px-6 py-3 border border-slate-300">
                            <a className="flex items-center">
                                Branch Name
                                <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg></a>
                        </th>
                        <th scope="col" className="px-6 py-3 border border-slate-300">
                            <a className="flex items-center">
                                Last Update
                                <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg></a>
                        </th>
                        <th scope="col" className="px-6 py-3 border border-slate-300">
                            <div className="flex items-center">
                                Actions
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {departmentsByDate && departmentsByDate.map((dept: Department) => (
                        <DepartmentDatatableRow
                            key={dept.id}
                            department={dept}
                        />
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            {pagination && (
                <div className="flex items-center justify-between mt-2">
                    {/* Show item range */}
                    <span
                        className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing
                        <strong className="font-semibold text-gray-900 dark:text-white">
                            {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}-
                            {(pagination.itemsPerPage * pagination.currentPage! > pagination.totalItems)
                                ? pagination.totalItems
                                : pagination.itemsPerPage * pagination.currentPage
                            }
                        </strong> of <span
                            className="font-semibold text-gray-900 dark:text-white"> {pagination.totalItems} </span>
                    </span>

                    {/* Items per page selection */}
                    <div className="font-semibold">
                        Select <select>select</select>
                    </div>

                    {/* Pagination component */}
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    )
}

export default observer(DepartmentDataTable)