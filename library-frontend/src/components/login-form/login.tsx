import { useMemo, useCallback } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

function Login() {
  const initialValues = {
    username: '',
    password: ''
  };

  const onSubmit = useCallback(
    (values: { username: string; password: string }) => {
      console.log(values);
    },
    [],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required').min(5),
      }),
    [],
  );

  return (
    <div className="h-screen flex items-center justify-center transform scale-125 bg-gray-light">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {formik => (
          <Form className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 bg-opacity-100">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
                htmlFor="username"
              >
                Username
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
                Password
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
                className="bg-blue-light hover:bg-blue-facebook hover:scale-110 duration-200 ease-in-out text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Sign In
              </button>
              <a
                className="block ml-8 align-baseline font-bold text-sm text-blue-light hover:text-blue-facebook"
                href="#"
              >
                Forgot Password? 
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
