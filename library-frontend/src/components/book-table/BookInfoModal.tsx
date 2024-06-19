import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import { GetBookInfoDTO, CreateBookInfoDTO } from '../api/dto/book.info.dto';
import { GetBookDTO } from '../api/dto/book.dto';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { SquarePen } from 'lucide-react';

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
    imgURL: isEditing ? bookInfo?.imgURL || '' : '',
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        genre: yup.string().required(t('requiredField')),
        summary: yup.string().required(t('requiredField')),
        imgURL: yup.string().url(t('invalidURL')),
      }),
    [t],
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div
        className="relative w-1/3 rounded-md bg-white p-6 shadow-md"
        style={{
          animation: 'fade-up 0.7s',
        }}
      >
        <div className="flex justify-between">
          <div className="mb-4 flex flex-row text-xl font-bold">
            {book?.title}
            <SquarePen
              className="relative top-1"
              size={22}
              onClick={() => setIsEditing((prevState) => !prevState)}
            />
          </div>
          <button
            type="button"
            className="relative -right-5 -top-9 text-4xl text-gray-500 hover:text-gray-800"
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
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  />
                ) : (
                  <div className="rounded border border-gray-300 px-3 py-2">
                    {bookInfo?.genre || '-'}
                  </div>
                )}
                <ErrorMessage
                  name="genre"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('summary')}</label>
                {isEditing ? (
                  <Field
                    as="textarea"
                    name="summary"
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  />
                ) : (
                  <div className="rounded border border-gray-300 px-3 py-2">
                    {bookInfo?.summary || '-'}
                  </div>
                )}
                <ErrorMessage
                  name="summary"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">{t('imgURL')}</label>
                {isEditing ? (
                  <Field
                    type="text"
                    name="imgURL"
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  />
                ) : (
                  <div className="rounded border border-gray-300 px-3 py-2">
                    {bookInfo?.imgURL || '-'}
                  </div>
                )}
                <ErrorMessage
                  name="imgURL"
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
