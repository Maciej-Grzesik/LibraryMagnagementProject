import { useMemo, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';

function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const apiClient = useApi();

  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          navigate('/home');
        } else {
          formik.setFieldError('username', 'Invalid username or password');
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required(t('username_error_msg')),
        password: yup
          .string()
          .required(t('password_error_msg'))
          .min(5, t('min_pass')),
      }),
    [],
  );

  return (
    <div className="flex h-screen items-center justify-center bg-st-tropaz-100">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form className="mb-4 scale-125 transform rounded-lg bg-st-tropaz-50 bg-opacity-100 px-8 pb-8 pt-6 shadow-xl">
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
            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-st-tropaz-400 px-6 py-2 font-bold text-white duration-200 ease-in-out hover:scale-110 hover:bg-blue-facebook focus:outline-none"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {t('sign_in')}
              </button>
              <a
                className="ml-8 block align-baseline text-sm font-bold text-st-tropaz-400 hover:text-blue-facebook hover:animate-wiggle"
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
