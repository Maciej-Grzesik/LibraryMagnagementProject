import React, { useCallback, useMemo } from 'react';
import * as yup from 'yup';

function Login() {
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
      <form className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 bg-blue-200 bg-opacity-100">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-left"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-left text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-light hover:bg-blue-facebook hover:scale-110 duration-200 ease-in-out text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            type="button"
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
      </form>
    </div>
  );
}

//trzeba miec info odnoscnie formularza typu login wymagany i haslo wymagane  i haslo minimum 5 znakow plus guzik powinien sie odpalac tylko w momencie kiedy sa wpisane rzeczy w polach
export default Login;
