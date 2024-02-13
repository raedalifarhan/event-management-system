
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../app/common/button';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import ValidationErrors from '../../app/errors/ValidationErrors';

const RegisterForm = () => {
  const { userStore, commonStore } = useStore();
  const { loading } = commonStore;

  const registerValidationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    displayName: Yup.string().required('display name is required'),
    username: Yup.string().required('Username is required'),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5">Register</h2>
        <div className='w-full bg-slate-400 h-1'></div>
        <Formik
          initialValues={{ displayName:'', email:'', username: '', password: '', error: null }}
          validationSchema={registerValidationSchema}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            userStore.register(values).catch(error => {
              setErrors({error});
              setSubmitting(false);
            });
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form className='ui form'>
              <div className="mb-4 mt-5">
                <label htmlFor="displayName" className="block mb-1 font-semibold">
                  Diplay Name
                </label>
                <Field type="text" name="displayName" className="w-full border rounded-md px-3 py-2" />
                <ErrorMessage name="displayName" component="div" className="text-red-500 text-sm mt-1 font-semibold italic" />
              </div>

              <div className="mb-4 mt-5">
                <label htmlFor="email" className="block mb-1 font-semibold">
                  Email
                </label>
                <Field type="email" name="email" className="w-full border rounded-md px-3 py-2" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1 font-semibold italic" />
              </div>

              <div className="mb-4 mt-5">
                <label htmlFor="username" className="block mb-1 font-semibold">
                  Username
                </label>
                <Field type="text" name="username" className="w-full border rounded-md px-3 py-2" />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1 font-semibold italic" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block mb-1 font-semibold">
                  Password
                </label>
                <Field type="password" name="password" className="w-full border rounded-md px-3 py-2" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1 font-semibold italic" />
              </div>
                <ErrorMessage
                  name="error"
                  render={() => <ValidationErrors errors={errors.error} />}
                />
              <Button
                type="submit"
                disabled={ isSubmitting && loading }
                loading={ isSubmitting && loading}
                content="Saving..."
                value="Save"
                className="items-center px-3 py-2 w-full text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default observer(RegisterForm);