import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Navbar from '../navbar/navbar';
import { useApi } from '../api/ApiProvider';
import { GetLoanDTO } from '../api/dto/loan.dto';
import AddLoanModal from './LoanModal';
import { useTranslation } from 'react-i18next';

function LoanTable() {
  const { t, i18n} = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loans, setLoans] = useState<GetLoanDTO[]>([]);
  const [filterText, setFilterText] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };
  
  const apiClient = useApi();

  useEffect(() => {
    const getLoans = async () => {
      const response = await apiClient.getLoans();
      if (response.success && response.data) {
        setLoans(response.data)
        console.log(response.data[0].dueDate)
      }
    }

    getLoans()

    
  }, [apiClient])

  const filteredData = loans.filter(
    (loan) =>
      loan.title?.includes(filterText.toLowerCase()) || 
      loan.username?.includes(filterText.toLowerCase())
  );

  const displayData = filteredData
  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
  .map((loan, index) => {
    const isOverdue = loan.returnDate && loan.dueDate && loan.returnDate > loan.dueDate;

    const formatDate = (timestamp: string | number | Date | undefined) => {
      if (!timestamp) return '-------';
      const date = new Date(timestamp);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    };

    return (
      <tr
        key={index}
        className={`${isOverdue ? 'bg-red-light-opacity-50' : index % 2 === 0 ? 'bg-blue-light-opacity-50' : 'bg-white'} 
        shadow-md hover:scale-105 ease-in-out duration-500 h-10 hover:cursor-pointer break-all`}
      >
        <td className="pl-3 rounded-l-md border-l border-t border-b border-gray-700 border-opacity-30 ">
          {loan.username}
        </td>
        <td className="border-t border-b border-gray-700 border-opacity-30">
          {loan.title}
        </td>
        <td className="border-t border-b border-gray-700 border-opacity-30">
          {formatDate(loan.dueDate)}
        </td>
        <td className="border-t border-b border-gray-700 border-opacity-30 text-center">
          {formatDate(loan.dueDate)}
        </td>
        <td className="rounded-r-md border-r border-t border-b border-gray-700 border-opacity-30 text-center">
          {formatDate(loan.returnDate)}
        </td>
      </tr>
    );
  });


  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-light">
      <div className="mx-auto w-11/12 flex flex-row relative">
        <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
          <SearchIcon className="w-5 h-5 absolute ml-3 pointer-events-none"></SearchIcon>
          <input
            className="pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            type="text"
            placeholder={t('search')}
            autoComplete="off"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className="absolute -right-2">
          <button 
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            onClick={(e) => setIsModalOpen(true)}
            >
            <span className="relative px-5 py-2.5 transition-all text-blue-facebook ease-in duration-75 bg-white dark:white rounded-md group-hover:bg-opacity-0 hover:text-white">
              {t("add_new_loan")}
            </span>
          </button>
        </div>
      </div>
      <table className="table-auto w-11/12 border-separate border-spacing-y-3 text-left ">
        <thead className="bg-blue-facebook h-14 shadow-md text-white">
          <tr>
            <th className="rounded-l-md pl-3 w-60">{t('user')}</th>
            <th className="w-40">{t('book')}</th>
            <th className="w-32">{t('loan_date')}</th>
            <th className="w-32 text-center">{t('due_date')}</th>
            <th className="rounded-r-md text-center">{t('return_date')}</th>
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
      {isModalOpen && (
        <AddLoanModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default LoanTable;
