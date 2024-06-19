import React, { useMemo, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { UserRole } from '../api/dto/login.dto';
import Navbar from '../navbar/navbar';
import { useTranslation } from 'react-i18next';

function AddUser() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const apiClient = useApi();

  var initialValues = {
    username: '',
    password: '',
    role: UserRole.ROLE_READER,
    email: '',
  };

  const onSubmit = useCallback(
    (
      values: {
        username: string;
        password: string;
        role: UserRole;
        email: string;
      },
      formik: any,
    ) => {
      apiClient.addUser(values).then((response) => {
        if (response.success) {
          initialValues = {
            username: '',
            password: '',
            role: UserRole.ROLE_READER,
            email: '',
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
        email: yup
          .string()
          .email('Invalid email')
          .required('Email is required'),
      }),
    [],
  );

  return (
    <div className="flex h-screen items-center justify-center bg-gray-light">
      
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form className="mb-4 scale-125 transform rounded-lg bg-white bg-opacity-100 px-8 pb-8 pt-6 shadow-xl">
            <div className="mb-4">
              <label
                className="mb-2 block text-left text-sm font-bold text-gray-700"
                htmlFor="username"
              >
                {t('username')}
              </label>
              <Field
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="username"
                type="text"
                name="username"
                placeholder="Username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-xs italic text-red-500"
              />
            </div>
            <div className="mb-6">
              <label
                className="mb-2 block text-left text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                {t('password')}
              </label>
              <Field
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="password"
                type="password"
                name="password"
                placeholder="******************"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-xs italic text-red-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-left text-sm font-bold text-gray-700"
                htmlFor="role"
              >
                {t('role')}
              </label>
              <Field
                as="select"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="role"
                name="role"
              >
                <option value={UserRole.ROLE_ADMIN}>Admin</option>
                <option value={UserRole.ROLE_READER}>Reader</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="text-xs italic text-red-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-left text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-xs italic text-red-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline w-full rounded bg-blue-light px-6 py-2 font-bold text-white duration-200 ease-in-out hover:scale-110 hover:bg-blue-facebook focus:outline-none"
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
