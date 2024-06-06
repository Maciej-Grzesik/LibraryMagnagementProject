import React, { useState, useMemo, useCallback } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useApi } from '../api/ApiProvider';

interface AddLoanModalProps {
  onClose: () => void;
}

const AddLoanModal: React.FC<AddLoanModalProps> = ({ onClose }) => {
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
        <h2 className="text-xl font-bold mb-4">Create New Loan</h2>
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
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="bookId" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">User ID</label>
                <Field
                  type="text"
                  name="userId"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="userId" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Due Date</label>
                <Field
                  type="date"
                  name="dueDate"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="dueDate" component="div" className="text-red-500" />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-500 text-white p-2 rounded-md mr-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  Create Loan
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
