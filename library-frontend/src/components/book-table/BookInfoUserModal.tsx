import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import { GetBookInfoDTO } from '../api/dto/book.info.dto';
import { GetBookDTO } from '../api/dto/book.dto';
import { SquarePen } from 'lucide-react';

interface BookInfoUserModalProps {
  onClose: () => void;
  book: GetBookDTO | undefined;
}

const BookInfoUserModal: React.FC<BookInfoUserModalProps> = ({ onClose, book }) => {
  const apiClient = useApi();
  const { t } = useTranslation();
  const [bookInfo, setBookInfo] = useState<GetBookInfoDTO>();

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div
        className="relative w-1/2 rounded-md bg-white p-6 shadow-md"
        style={{
          animation: 'fade-up 0.7s',
        }}
      >
        <div className="flex justify-between">
          <div className="mb-4 flex text-xl font-bold">
            {book?.title}
          </div>
          <button
            type="button"
            className="relative -right-5 -top-9 text-4xl text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="flex">
          <div className="mb-4 mr-4">
            {bookInfo?.imgURL ? (
              <img
                src={bookInfo.imgURL}
                alt={book?.title}
                className="rounded border border-gray-300 px-3 py-2 min-h-[26rem]"
              />
            ) : (
              <div className="rounded border border-gray-300 px-3 py-2">
                {t('noImage')}
              </div>
            )}
          </div>
          <div className='w-2/3 -mt-6'>
            <div className="mb-2 flex flex-col">
              <label className="text-gray-700">{t('genre')}</label>
              <div className="rounded border border-gray-300 px-3 py-2">
                {bookInfo?.genre || '-'}
              </div>
            </div>
            <div className="mb-2 ">
              <label className="text-gray-700">{t('summary')}</label>
              <div className="rounded border border-gray-300 px-3 py-2">
                {bookInfo?.summary || '-'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfoUserModal;
