import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import { GetBookInfoDTO } from '../api/dto/book.info.dto';
import { GetBookDTO } from '../api/dto/book.dto';
import { GetReviewDto } from '../api/dto/review.dto';

interface BookInfoUserModalProps {
  onClose: () => void;
  book: GetBookDTO | undefined;
}

const BookInfoUserModal: React.FC<BookInfoUserModalProps> = ({ onClose, book }) => {
  const apiClient = useApi();
  const { t } = useTranslation();
  const [bookInfo, setBookInfo] = useState<GetBookInfoDTO>();
  const [reviews, setReviews] = useState<GetReviewDto[]>([]);

  useEffect(() => {
    
    const getBookInfo = async (bookId: number) => {
      const response = await apiClient.getBookInfo(bookId);
      console.log(response);
      if (response.success && response.data) {
        setBookInfo(response.data);
        
      }
    };

    const getReview = async (bookTitle: string) => {
      const responseReview = await apiClient.getReview(bookTitle);
      console.log(responseReview)
      if (responseReview.success && responseReview.data) {
        setReviews(responseReview.data);
        
      }
    }
    if (book && typeof book.id === 'number' && book.title) {
      
      getBookInfo(book.id);
      getReview(book.title)
    }
  }, [book, apiClient]);

  const formatDate = (timestamp: string | number | Date | undefined) => {
    if (!timestamp) return '-------';
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };
  
  

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
            <div className="mb-2">
              <label className="text-gray-700">{t('summary')}</label>
              <div className="rounded border border-gray-300 px-3 py-2">
                {bookInfo?.summary || '-'}
              </div>
            </div>
            <div>
              <label className="text-gray-700">{t('reviews')}</label>
              {reviews.map((review, index) => (
                <div key={index} className="rounded border border-gray-300 px-3 py-2 mb-2">
                  <p><strong>{t('rating')}: </strong>{review.rating}/5</p>
                  <p><strong>{t('comment')}: </strong>{review.comment}</p>
                  <p><strong>{t('date')}: </strong>{formatDate(review.date)}</p>
                  <p><strong>{t('username')}: </strong>{review.username}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfoUserModal;
