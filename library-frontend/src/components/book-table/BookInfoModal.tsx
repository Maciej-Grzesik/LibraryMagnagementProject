import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useApi } from "../api/ApiProvider";
import { GetBookInfoDTO, CreateBookInfoDTO } from "../api/dto/book.info.dto";
import { GetBookDTO } from "../api/dto/book.dto";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { SquarePen } from 'lucide-react'

interface BookInfoModalProps {
  onClose: () => void;
  book: GetBookDTO | undefined;
}

const BookInfoModal: React.FC<BookInfoModalProps> = ({ onClose, book }) => {
  const apiClient = useApi();
  const { t } = useTranslation();
  const [bookInfo, setBookInfo] = useState<GetBookInfoDTO>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getBookInfo = async (bookId: number) => {
      const response = await apiClient.getBookInfo(bookId);
      if (response.success && response.data) {
        setBookInfo(response.data);
      }
    };
    if (book && typeof book.id === 'number') {
      getBookInfo(book.id);
    }
  }, [book, apiClient]);

  const initialValues: CreateBookInfoDTO = {
    bookId: book?.id || 0,
    genre: isEditing ? bookInfo?.genre || '' : '',
    summary: isEditing ? bookInfo?.summary || '' : '',
    imgURL: isEditing ? bookInfo?.imgURL || '' : ''
  };

  const validationSchema = useMemo(() => 
    yup.object().shape({
      genre: yup.string().required(t('requiredField')),
      summary: yup.string().required(t('requiredField')),
      imgURL: yup.string().url(t('invalidURL'))
    }), [t]
  );

  const onSubmit = useCallback(
    (values: CreateBookInfoDTO, formik: any) => {
        apiClient.addBookInfo(values).then((response) => {
            if (response.success) {
                
            } else {
                
            }
        });
    },
    [apiClient],
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center "

    >
      <div className="relative bg-white p-6 rounded-md shadow-md w-1/3"
               style={{
                animation: 'fade-up 0.7s',
                }}>
        <div className="flex justify-between">
          <div className="text-xl font-bold mb-4 flex flex-row">
            {book?.title}
            <SquarePen
                className="relative top-1"
                size={22}
                onClick={() => setIsEditing(prevState => !prevState)}
            />
          </div>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-800 text-4xl relative -top-9 -right-5"
            onClick={() => {
              onClose();
              setIsEditing(false);
            }}
          >
            &times;
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div className="mb-2">
                <label className="block text-gray-700">{t('genre')}</label>
                {isEditing ? (
                  <Field
                    type="text"
                    name="genre"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  <div className="py-2 px-3 border border-gray-300 rounded">
                    {bookInfo?.genre || '-'}
                  </div>
                )}
                <ErrorMessage name="genre" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('summary')}</label>
                {isEditing ? (
                  <Field
                    as="textarea"
                    name="summary"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  <div className="py-2 px-3 border border-gray-300 rounded">
                    {bookInfo?.summary || '-'}
                  </div>
                )}
                <ErrorMessage name="summary" component="div" className="text-red-500" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('imgURL')}</label>
                {isEditing ? (
                  <Field
                    type="text"
                    name="imgURL"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  <div className="py-2 px-3 border border-gray-300 rounded">
                    {bookInfo?.imgURL || '-'}
                  </div>
                )}
                <ErrorMessage name="imgURL" component="div" className="text-red-500" />
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
                  disabled={!isValid || isSubmitting}
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

export default BookInfoModal;
