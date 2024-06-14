import React, { useMemo, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { UserRole } from '../api/dto/login.dto';
import Navbar from '../navbar/navbar';
import { useTranslation } from 'react-i18next';

function AddUser() {
  const { t, i18n} = useTranslation();
  const navigate = useNavigate();
  const apiClient = useApi();

  var initialValues = {
    username: '',
    password: '',
    role: UserRole.ROLE_READER,
    email: ''
  };

  const onSubmit = useCallback(
    (values: { username: string; password: string, role: UserRole, email: string }, formik: any) => {
      apiClient.addUser(values).then((response) => {
        if (response.success) {
          initialValues = {
            username: '',
            password: '',
            role: UserRole.ROLE_READER,
            email: ''
          };
        
        } else {
          formik.setFieldError('username', 'Error adding user');
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required').min(5),
        role: yup.string().required('Role is required'),
        email: yup.string().email('Invalid email').required('Email is required')
      }),
    [],
  );

  return (
    <div className="h-screen flex items-center justify-center bg-gray-light">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {formik => (
          <Form className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 bg-opacity-100 transform scale-125">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
                htmlFor="username"
              >
                {t('username')}
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="username"
                placeholder="Username"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-left text-sm font-bold mb-2"
                htmlFor="password"
              >
                {t('password')}
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="******************"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-left text-sm font-bold mb-2"
                htmlFor="role"
              >
                {t('role')}
              </label>
              <Field
                as="select"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                name="role"
              >
                <option value={UserRole.ROLE_ADMIN}>Admin</option>
                <option value={UserRole.ROLE_READER}>Reader</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-left text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-light w-full hover:bg-blue-facebook active:scale-105 hover:scale-110 duration-200 ease-in-out text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {t('add_user')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddUser;
