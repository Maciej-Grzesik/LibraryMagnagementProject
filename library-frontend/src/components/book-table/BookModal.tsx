import React, { useState, useMemo, useCallback } from 'react';
import { CreateBookDTO, GetBookDTO } from '../api/dto/book.dto';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useApi } from '../api/ApiProvider';

interface AddBookModalProps {
  onClose: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ onClose }) => {
  const apiClient = useApi();

  const initialValues: CreateBookDTO = {
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    publishYear: 0,
    availableCopies: 0
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        isbn: yup.string().required('Username is required').length(13),
        title: yup.string().required('Password is required'),
        author: yup.string().required('Password is required'),
        publisher: yup.string().required('Password is required'),
        publishYear: yup.number().required('Publish year is required').min(0),
        availableCopies: yup.number().required('Password is required').min(0),
      }),
    [],
  );

  const onSubmit = useCallback(
    (newBook: CreateBookDTO, formik: any) => {
      apiClient.addBook(newBook).then((response) => {
        if (response.success) {
          onClose();
        } else {
          formik.setFieldError('username', 'Invalid username or password')
        }
      });
    },
    [apiClient],
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Add New Book</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div className="mb-2">
                <label className="block text-gray-700">ISBN</label>
                <Field
                  type="text"
                  name="isbn"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="isbn" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Title</label>
                <Field
                  type="text"
                  name="title"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="title" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Author</label>
                <Field
                  type="text"
                  name="author"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="author" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Publisher</label>
                <Field
                  type="text"
                  name="publisher"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="publisher" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Publish Year</label>
                <Field
                  type="text"
                  name="publishYear"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="publisher" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Copies</label>
                <Field
                  type="text"
                  name="availableCopies"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="isAvailable" component="div" className="text-red-500" />
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
                  Add Book
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddBookModal;
