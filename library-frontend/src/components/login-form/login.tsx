import { useMemo, useCallback } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';

function Login() {
  const {t, i18n} = useTranslation();
  const navigate = useNavigate();
  const apiClient = useApi();

  const initialValues = {
    username: '',
    password: ''
  };

  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          navigate('/home');
        } else {
          formik.setFieldError('username', 'Invalid username or password')
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required(t('username_error_msg')),
        password: yup.string().required(t('password_error_msg')).min(5, t('min_pass')),
      }),
    [],
  );

  return (
    <div className="h-screen flex items-center justify-center bg-gray-light">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {formik => (
          <Form className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 bg-opacity-100 transform scale-125">
            <div className="mb-4 ">
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
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-light hover:bg-blue-facebook active:scale-105 hover:scale-110 duration-200 ease-in-out text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {t('sign_in')}
              </button>
              <a
                className="block ml-8 align-baseline font-bold text-sm text-blue-light hover:text-blue-facebook"
                href="#"
              >
                {t('forgot_password')}
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
