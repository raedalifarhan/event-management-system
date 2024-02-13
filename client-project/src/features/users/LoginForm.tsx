import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../app/common/button';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';

const LoginForm = () => {
  const { userStore, commonStore } = useStore();
  const { loading } = commonStore;

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5">Login</h2>
        <div className='w-full bg-slate-400 h-1'></div>
        <Formik
          initialValues={{ email: '', password: '', error: null }}
          validationSchema={loginValidationSchema}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            userStore.login(values).catch(error => {
              setErrors({ error: 'Invalid email or password' });
              setSubmitting(false);
            });
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div className="mb-4 mt-5">
                <label htmlFor="email" className="block mb-1">
                  Email
                </label>
                <Field type="email" name="email" className="w-full border rounded-md px-3 py-2" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1 font-semibold italic" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1">
                  Password
                </label>
                <Field type="password" name="password" className="w-full border rounded-md px-3 py-2" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1 font-semibold italic" />
                <ErrorMessage
                  name="error"
                  component="div"
                  render={() => (
                    <span className='text-red-500 text-base font-semibold italic'>{errors.error}</span>
                  )}
                />
              </div>
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

export default observer(LoginForm);
