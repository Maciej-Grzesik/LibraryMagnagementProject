import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';

interface AddLoanModalProps {
  onClose: () => void;
}

const AddLoanModal: React.FC<AddLoanModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const apiClient = useApi();
  const [titles, setTitles] = useState<string[]>([]);
  const [filteredTitles, setFilteredTitles] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      const response = await apiClient.getBooks();
      if (response.success && response.data) {
        const bookTitles = response.data
          .map((book: { title?: string }) => book.title)
          .filter((title): title is string => title !== undefined);
        setTitles(bookTitles);
      }
    };

    getBooks();
  }, [apiClient]);

  const initialValues = {
    bookTitle: '',
    username: '',
    dueDate: '',
    loanDate: '',
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        bookTitle: yup.string().required('Book title is required'),
        username: yup.string().required('User ID is required'),
        dueDate: yup.date().required('Due date is required').nullable(),
      }),
    [],
  );

  const onSubmit = useCallback(
    (
      newLoan: {
        bookTitle: string;
        username: string;
        dueDate: string;
        loanDate: string;
      },
      formik: any,
    ) => {
      apiClient.addLoan(newLoan).then((response) => {
        if (response.success) {
          onClose();
        } else {
          formik.setFieldError('bookTitle', 'Error creating loan');
        }
      });
    },
    [apiClient, onClose],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filtered = titles.filter(title =>
      title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTitles(filtered);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (title: string, setFieldValue: Function) => {
    setFieldValue('bookTitle', title);
    setShowSuggestions(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div
        className="w-1/3 rounded-md bg-white p-6 shadow-md"
        style={{
          animation: 'fade-down 0.7s',
        }}
      >
        <div className="flex justify-between">
          <h2 className="mb-4 text-xl font-bold">{t('add_new_loan')}</h2>
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
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-2">
                <label className="block text-gray-700">Book Title</label>
                <Field
                  type="text"
                  name="bookTitle"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(e);
                    setFieldValue('bookTitle', e.target.value);
                  }}
                />
                {showSuggestions && (
                  <div className="border mt-2 max-h-40 overflow-y-auto bg-white">
                    {filteredTitles.map(title => (
                      <div
                        key={title}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleSuggestionClick(title, setFieldValue)}
                      >
                        {title}
                      </div>
                    ))}
                  </div>
                )}
                <ErrorMessage
                  name="bookTitle"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Username</label>
                <Field
                  type="text"
                  name="username"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('due_date')}</label>
                <Field
                  type="date"
                  name="dueDate"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage
                  name="dueDate"
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
