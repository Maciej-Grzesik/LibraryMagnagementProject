import React, { useState, useMemo, useCallback } from 'react';
import { CreateBookDTO, GetBookDTO } from '../api/dto/book.dto';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';

interface AddBookModalProps {
  onClose: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ onClose }) => {
  const apiClient = useApi();
  const { t, i18n } = useTranslation();

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
        isbn: yup.string().required('ISBN is required').length(13),
        title: yup.string().required('Title is required'),
        author: yup.string().required('Author is required'),
        publisher: yup.string().required('Publisher is required'),
        publishYear: yup.number().required('Publish year is required').min(0),
        availableCopies: yup.number().required('Available copies are required').min(0),
      }),
    [],
  );

  const onSubmit = useCallback(
    (newBook: CreateBookDTO, formik: any) => {
      apiClient.addBook(newBook).then((response) => {
        if (response.success) {
          onClose();
        } else {
          formik.setFieldError('isbn', 'Error adding the book');
        }
      });
    },
    [apiClient, onClose],
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
    >
      <div className="relative bg-white p-6 rounded-md  w-1/3 shadow-md"
      style={{
        animation: 'fade-down 0.7s'
      }}>
        <div className='flex justify-between' >
        <h2 className="text-xl font-bold mb-4">{t('add_new_book')}</h2>
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
                <label className="block text-gray-700">ISBN</label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="isbn"
                />
                <ErrorMessage name="isbn" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('title')}</label>
                <Field
                  type="text"
                  name="title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="title" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('author')}</label>
                <Field
                  type="text"
                  name="author"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="author" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('publisher')}</label>
                <Field
                  type="text"
                  name="publisher"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="publisher" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('year_of_publish')}</label>
                <Field
                  type="text"
                  name="publishYear"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="publishYear" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('copies')}</label>
                <Field
                  type="text"
                  name="availableCopies"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="availableCopies" component="div" className="text-red-500" />
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
                  {t('add_book')}
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
