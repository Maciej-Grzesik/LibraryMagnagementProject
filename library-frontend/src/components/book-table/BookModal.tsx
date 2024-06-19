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
    availableCopies: 0,
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        isbn: yup.string().required('ISBN is required').length(13),
        title: yup.string().required('Title is required'),
        author: yup.string().required('Author is required'),
        publisher: yup.string().required('Publisher is required'),
        publishYear: yup.number().required('Publish year is required').min(0),
        availableCopies: yup
          .number()
          .required('Available copies are required')
          .min(0),
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div
        className="relative w-1/3 rounded-md bg-white p-6 shadow-md"
        style={{
          animation: 'fade-down 0.7s',
        }}
      >
        <div className="flex justify-between">
          <h2 className="mb-4 text-xl font-bold">{t('add_new_book')}</h2>
          <button
            type="button"
            className="relative -right-5 -top-9 text-4xl text-gray-500 hover:text-gray-800"
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
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  name="isbn"
                />
                <ErrorMessage
                  name="isbn"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('title')}</label>
                <Field
                  type="text"
                  name="title"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('author')}</label>
                <Field
                  type="text"
                  name="author"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage
                  name="author"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('publisher')}</label>
                <Field
                  type="text"
                  name="publisher"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage
                  name="publisher"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">
                  {t('year_of_publish')}
                </label>
                <Field
                  type="text"
                  name="publishYear"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage
                  name="publishYear"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('copies')}</label>
                <Field
                  type="text"
                  name="availableCopies"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage
                  name="availableCopies"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mt-5 flex justify-between">
                <button
                  type="button"
                  className="focus:shadow-outline rounded bg-red-400 px-6 py-2 font-bold text-white duration-200 ease-in-out hover:scale-110 hover:bg-red-700 focus:outline-none"
                  onClick={onClose}
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="focus:shadow-outline rounded bg-blue-light px-6 py-2 font-bold text-white duration-200 ease-in-out hover:scale-110 hover:bg-blue-facebook focus:outline-none"
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
