import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { GetBookDTO } from '../api/dto/book.dto';
import { useApi } from '../api/ApiProvider';
import AddBookModal from './BookModal';
import BookInfoModal from './BookInfoModal';
import { useTranslation } from 'react-i18next';
import BookInfoUserModal from './BookInfoUserModal';

function BookTable() {
  const { t } = useTranslation();

  const [books, setBooks] = useState<GetBookDTO[]>([]);
  const [selectedBook, setSelectedBook] = useState<GetBookDTO>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookInfoOpen, setBookInfoOpen] = useState(false);

  const [filterText, setFilterText] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const apiClient = useApi();
  const role = apiClient.getRole();

  useEffect(() => {
    const getBooks = async () => {
      const response = await apiClient.getBooks();
      if (response.success && response.data) {
        setBooks(response.data);
      }
    };

    getBooks();

    if (!isModalOpen) {
      getBooks();
    }
  }, [apiClient, isModalOpen, isBookInfoOpen]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleRowClick = (book: GetBookDTO) => {
    setSelectedBook(book);
    setBookInfoOpen(true);
  };

  const filteredData = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(filterText.toLowerCase()) ||
      book.author?.toLowerCase().includes(filterText.toLowerCase()) ||
      book.isbn?.toLowerCase().includes(filterText.toLowerCase()) ||
      book.publisher?.toLowerCase().includes(filterText.toLowerCase()),
  );

  const displayData = filteredData
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((book, index) => {
      const isAvailable =
        book.availableCopies !== undefined && book.availableCopies > 0;
      return (
        <tr
          key={index}
          className={`${!isAvailable ? 'bg-red-light-opacity-50' : index % 2 === 0 ? 'bg-blue-light-opacity-50' : 'bg-white'} h-10 break-all shadow-md duration-500 ease-in-out hover:scale-105 hover:cursor-pointer`}
          onClick={() => handleRowClick(book)}
        >
          <td className="rounded-l-md border-b border-l border-t border-gray-700 border-opacity-30 pl-3">
            {book.title}
          </td>
          <td className="border-b border-t border-gray-700 border-opacity-30">
            {book.author}
          </td>
          <td className="border-b border-t border-gray-700 border-opacity-30">
            {book.isbn}
          </td>
          <td className="border-b border-t border-gray-700 border-opacity-30 text-center">
            {book.publishYear}
          </td>
          <td className="border-b border-t border-gray-700 border-opacity-30">
            {book.publisher}
          </td>
          <td className="rounded-r-md border-b border-r border-t border-gray-700 border-opacity-30 text-center">
            {book.availableCopies}
          </td>
        </tr>
      );
    });

  return (
    <div className="h-screen bg-gray-light">
      
      <div className="flex flex-col items-center justify-center pt-32">
        <div className="relative mx-auto flex w-11/12 flex-row">
          <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
            <SearchIcon className="pointer-events-none absolute ml-3 h-5 w-5"></SearchIcon>
            <input
              className="rounded-xl border-none py-2 pl-10 pr-3 font-semibold text-black placeholder-gray-500 ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-500"
              type="text"
              placeholder={t('search')}
              autoComplete="off"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <div className="absolute -right-2">
            {role === 'ROLE_ADMIN' && (<button
              className="group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 duration-200 ease-in-out hover:scale-105 hover:text-white active:scale-95 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="dark:white relative rounded-md bg-white px-5 py-2.5 text-blue-facebook transition-all duration-75 ease-in hover:text-white group-hover:bg-opacity-0">
                {t('add_new_book')}
              </span>
            </button>
            )}
          </div>
        </div>
        <table className="w-11/12 table-auto border-separate border-spacing-y-3 text-left">
          <thead className="h-14 bg-blue-facebook text-white shadow-md">
            <tr>
              <th className="max-w-[50px] rounded-l-md pl-3">{t('title')}</th>
              <th className="min-w-40">{t('author')}</th>
              <th className="w-32">ISBN</th>
              <th className="w-32 text-center">{t('year_of_publish')}</th>
              <th>{t('publisher')}</th>
              <th className="rounded-r-md text-center">
                {t('available_copies')}
              </th>
            </tr>
          </thead>
          <tbody className="text-left">{displayData}</tbody>
        </table>
        <Stack spacing={2} direction="row" mt={3}>
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
        {isModalOpen && <AddBookModal onClose={() => setIsModalOpen(false)} />}
        {isBookInfoOpen && role === 'ROLE_ADMIN' && (
          <BookInfoModal
            book={selectedBook}
            onClose={() => setBookInfoOpen(false)}
          />
        )}
        {isBookInfoOpen && role === 'ROLE_READER' && (
          <BookInfoUserModal
            book={selectedBook}
            onClose={() => setBookInfoOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default BookTable;
