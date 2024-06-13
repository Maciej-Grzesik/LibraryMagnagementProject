import React, { useState, useMemo, useCallback } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';

interface AddLoanModalProps {
  onClose: () => void;
}

const AddLoanModal: React.FC<AddLoanModalProps> = ({ onClose }) => {
  const { t, i18n} = useTranslation();
  const apiClient = useApi();

  const initialValues = {
    bookId: 0,
    userId: 0,
    dueDate: '',
    loanDate: ''
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        bookId: yup.number().required('Book ID is required'),
        userId: yup.number().required('User ID is required'),
        dueDate: yup.date().required('Due date is required').nullable(),
      }),
    [],
  );

  const onSubmit = useCallback(
    (newLoan: { bookId: number, userId: number, dueDate: string, loanDate: string }, formik: any) => {
      apiClient.addLoan(newLoan).then((response) => {
        if (response.success) {
          onClose();
        } else {
          formik.setFieldError('bookId', 'Error creating loan');
        }
      });
    },
    [apiClient],
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
      <div className='flex justify-between' >
        <h2 className="text-xl font-bold mb-4">{t('add_new_loan')}</h2>
        <button
          type="button"
          className=" text-gray-500 hover:text-gray-800 text-4xl relative -top-9 -right-5"
          onClick={onClose}
        >
          &times;
        </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div className="mb-2">
                <label className="block text-gray-700">Book ID</label>
                <Field
                  type="text"
                  name="bookId"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="bookId" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">User ID</label>
                <Field
                  type="text"
                  name="userId"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="userId" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('due_date')}</label>
                <Field
                  type="date"
                  name="dueDate"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="dueDate" component="div" className="text-red-500" />
              </div>
              <div className="flex justify-between mt-5">
                <button
                  type="button"
                  className="bg-red-400 hover:bg-red-700 hover:scale-110 duration-200 ease-in-out text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                  onClick={onClose}
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="bg-blue-light hover:bg-blue-facebook hover:scale-110 duration-200 ease-in-out text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                >
                  {t('add')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddLoanModal;
