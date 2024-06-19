import React, { useMemo, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';

function EditUser() {
  const { t, i18n } = useTranslation();

  const apiClient = useApi();

  const initialValues = {
    currentPassword: '',
    newPassword: '',
  };

  const onSubmit = useCallback(
    (
      values: {
        currentPassword: string;
        newPassword: string;
      },
      formik: any,
    ) => {
      apiClient.updateUser(values).then((response) => {
        if (response.success) {
        } else {
          formik.setFieldError('username', 'Error adding user');
        }
      });
    },
    [apiClient],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Username is required'),
        currentPassword: yup.string().required('Current password is required'),
        newPassword: yup.string().required('New password is required').min(5),
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
            <div className="mb-6">
              <label
                className="mb-2 block text-left text-sm font-bold text-gray-700"
                htmlFor="currentPassword"
              >
                {t('current_password')}
              </label>
              <Field
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="currentPassword"
                type="password"
                name="currentPassword"
                placeholder="******************"
              />
              <ErrorMessage
                name="currentPassword"
                component="div"
                className="text-xs italic text-red-500"
              />
            </div>
            <div className="mb-6">
              <label
                className="mb-2 block text-left text-sm font-bold text-gray-700"
                htmlFor="newPassword"
              >
                {t('new_password')}
              </label>
              <Field
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="newPassword"
                type="password"
                name="newPassword"
                placeholder="******************"
              />
              <ErrorMessage
                name="newPassword"
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
                {t('update_user')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditUser;
