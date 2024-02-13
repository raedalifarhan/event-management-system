import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import { observer } from 'mobx-react-lite';
import { IoIosClose } from 'react-icons/io';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import Button from '../../../app/common/button';
import { BranchKeyValue } from '../../../app/models/branch';
import { Department } from '../../../app/models/department';

const DepartmentForm = () => {
    const { departmentStore, branchStore } = useStore();
    const { closeForm, selectedDepartment, loading, cancelSelectDepartment, createDepartment, updateDepartment } = departmentStore;
    const { branchesKeyValueList } = branchStore;

    const branchesKeyValue: BranchKeyValue[] = [{ id: '', branchName: '--select branch--' }, ...branchesKeyValueList];

    const initialState: Department = selectedDepartment ?? {
        departmentName: '',
        lastUpdateDate: '',
        description: '',
        createDate: '',
        branchName: '',
        branchId: '',
        id: '',
    };

    const handleCloseForm = async () => {
        await cancelSelectDepartment();
        await closeForm();
    };

    const validationSchema = Yup.object().shape({
        departmentName: Yup.string().required('Please fill out this field.'),
        branchId: Yup.string().required('Please select a branch.'),
        description: Yup.string(),
    })

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Department Form</h2> <hr />
            <Formik enableReinitialize
                initialValues={initialState}
                onSubmit={(values, { setSubmitting }) => {
                    values.id ? updateDepartment(values) : createDepartment(values);
                    setSubmitting(false);
                }}
                validationSchema={validationSchema}
            >
                {({ isSubmitting, setFieldValue, values, dirty, isValid }: FormikProps<Department>) => (
                    <Form className="w-full" autoComplete="off">
                        <div className="flex flex-wrap -mx-3 my-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label htmlFor="departmentName" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Department Name
                                </label>
                                <Field
                                    type="text"
                                    name="departmentName"
                                    placeholder="Department Name"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                />
                                <ErrorMessage name="departmentName" component="p" className="text-red-500 text-md italic" />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label htmlFor="branchId" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Select Branch
                                </label>
                                <Field
                                    as="select"
                                    name="branchId"
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        const selectedBranchId = e.target.value;
                                        const selectedBranch = branchesKeyValue.find(branch => branch.id === selectedBranchId);

                                        setFieldValue('branchId', selectedBranchId);

                                        if (selectedBranch) {
                                            setFieldValue('branchName', selectedBranch.branchName);
                                        } else {
                                            setFieldValue('branchName', '');
                                        }
                                    }}
                                    value={values.branchId}
                                >
                                    <option value="" disabled>--select branch--</option>
                                    {branchesKeyValue.map((branch) => (
                                        <option key={branch.id} value={branch.id}>
                                            {branch.branchName}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="branchId" component="p" className="text-red-500 text-md italic" />
                            </div>
                            <div className="w-full px-3 my-6">
                                <label htmlFor="description" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Description
                                </label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    placeholder="Description"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                />
                                <ErrorMessage name="description" component="p" className="text-red-500 text-md italic" />
                            </div>
                        </div>
                        {/* Other form fields... */}
                        <Button
                            type="submit"
                            disabled={ isSubmitting || !dirty || !isValid }
                            loading={ isSubmitting || loading }
                            content="Saving..."
                            value="Save"
                            className="mr-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        />
                        <button
                            type="button"
                            onClick={handleCloseForm}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                        >
                            Cancel
                            <IoIosClose className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default observer(DepartmentForm);
