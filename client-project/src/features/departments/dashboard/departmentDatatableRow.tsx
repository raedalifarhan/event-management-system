import { SyntheticEvent, useState } from "react";
import { Department } from "../../../app/models/department"
import Button from "../../../app/common/button";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

interface Props {
  department: Department;
}

const DepartmentDatatableRow = ({ department }: Props) => {

  const { departmentStore } = useStore();
  const { openForm, closeForm, selectDepartment, deleteDepartment, loading } = departmentStore;


  const [target, setTarget] = useState('');

  function handleDepartmentDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteDepartment(id);
  }

  async function handleEditDepartment(id: string) {
    await closeForm();
    await openForm(id);
  }


  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

      <th scope="row"
        className="px-6 py-4 border border-slate-300 font-medium whitespace-nowrap text-blue-700 hover:text-yellow-700">
        <button className="underline" onClick={() => handleEditDepartment(department.id)}>

          {department.departmentName}
        </button>
      </th>
      <td className="px-6 py-4 border border-slate-300">
        {department.description}
      </td>
      <td className="px-6 py-4 border border-slate-300">
        {department.branchName}
      </td>
      <td className="px-6 py-4 border border-slate-300">
        {department.lastUpdateDate ? department.lastUpdateDate : department.createDate}
      </td>
      <td className="px-6 py-4 border-slate-300 flex items-center gap-1">
        <Button
          value="Delete"
          loading={loading && target === department.id}
          content="Deleting..."
          type="button"
          name={department.id}
          className="p-1 items-center text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          onClick={(e: SyntheticEvent<HTMLButtonElement>) => handleDepartmentDelete(e, department.id)}
        />
        <a
          className="p-1 items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 hover:underline"
          onClick={() => {
            selectDepartment(department.id);
            closeForm();
          }}
        >
          View
        </a>
      </td>

    </tr>
  )
}

export default observer (DepartmentDatatableRow)