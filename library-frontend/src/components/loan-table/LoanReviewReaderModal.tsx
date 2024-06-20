import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';
import { GetLoanDTO } from '../api/dto/loan.dto';

interface LoanReviewReaderModalProps {
  onClose: () => void;
  loan: GetLoanDTO | undefined;
}

const LoanReviewReaderModal: React.FC<LoanReviewReaderModalProps> = ({ onClose, loan }) => {
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
    username: apiClient.getUsername() || '',
    bookTitle: loan?.title || '',
    rating: 0,
    comment: '',
    
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        
        rating: yup.number().required('Rating is required').min(1).max(5),
        comment: yup.string().required('Comment is required'),
       
      }),
    [],
  );

  const onSubmit = useCallback(
    (
      newReview: {
        username: string;
        bookTitle: string;
        rating: number;
        comment: string;
        
      },
      formik: any,
    ) => {
      apiClient.addBookReview(newReview).then((response) => {
        if (response.success) {
          onClose();
        } else {
          formik.setFieldError('bookTitle', 'Error creating review');
        }
      });
    },
    [apiClient, onClose],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: Function) => {
    const value = e.target.value;
    const filtered = titles.filter(title =>
      title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTitles(filtered);
    setShowSuggestions(value.length > 0);
    setFieldValue('bookTitle', value);
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
          <h2 className="mb-4 text-xl font-bold">{t('add_new_review')}</h2>
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
                <label className="block text-gray-700">Rating</label>
                <Field
                  type="number"
                  name="rating"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  min={1}
                  max={5}
                />
                <ErrorMessage
                  name="rating"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Comment</label>
                <Field
                  type="text"
                  name="comment"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage
                  name="comment"
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

export default LoanReviewReaderModal;

