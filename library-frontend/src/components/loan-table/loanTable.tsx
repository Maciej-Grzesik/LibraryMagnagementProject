import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useApi } from '../api/ApiProvider';
import { GetLoanDTO } from '../api/dto/loan.dto';
import AddLoanModal from './LoanModal';
import { useTranslation } from 'react-i18next';
import LoanInfoModal from './LoanInfoModal';
import LoanReviewReaderModal from './LoanReviewReaderModal';

function LoanTable() {
  const apiClient = useApi();
  const role = apiClient.getRole();
  const { t } = useTranslation();

  const [loans, setLoans] = useState<GetLoanDTO[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<GetLoanDTO>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoanInfoOpen, setIsLoanInfoOpen] = useState(false);
  const [isLoanReviewOpen, setIsLoanReviewOpen] = useState(false);

  const [filterText, setFilterText] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  useEffect(() => {
    const getLoans = async () => {
      if (role === 'ROLE_ADMIN') {
        const response = await apiClient.getLoans();
        if (response.success && response.data) {
          setLoans(response.data);
        }
      } else {
        const response = await apiClient.getLoansByUsername();
        if (response.success && response.data) {
          setLoans(response.data);
        }
      }
    };

    getLoans();

    if (!isModalOpen && !isLoanInfoOpen && !isLoanReviewOpen) {
      getLoans();
    }
  }, [apiClient, isModalOpen, isLoanInfoOpen, isLoanReviewOpen, role]);

  const handleRowClick = (loan: GetLoanDTO) => {
    setSelectedLoan(loan);
    if (role === 'ROLE_ADMIN') {
      setIsLoanInfoOpen(true);
    } else if (role === 'ROLE_READER') {
      setIsLoanReviewOpen(true);
    }
  };

  const filteredData = loans.filter(
    (loan) =>
      loan.title?.toLowerCase().includes(filterText.toLowerCase()) ||
      loan.username?.toLowerCase().includes(filterText.toLowerCase()),
  );

  const displayData = filteredData
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((loan, index) => {
      const isOverdue =
        loan.returnDate && loan.dueDate && loan.returnDate > loan.dueDate;

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
          className={`${isOverdue ? 'bg-red-light-opacity-50' : index % 2 === 0 ? 'bg-blue-light-opacity-50' : 'bg-white'} h-10 break-all shadow-md duration-500 ease-in-out hover:scale-105 hover:cursor-pointer`}
          onClick={() => handleRowClick(loan)}
        >
          <td className="rounded-l-md border-b border-l border-t border-gray-700 border-opacity-30 pl-3">
            {loan.username}
          </td>
          <td className="border-b border-t border-gray-700 border-opacity-30">
            {loan.title}
          </td>
          <td className="border-b border-t border-gray-700 border-opacity-30">
            {formatDate(loan.loanDate)}
          </td>
          <td className="border-b border-t border-gray-700 border-opacity-30 text-center">
            {formatDate(loan.dueDate)}
          </td>
          <td className="rounded-r-md border-b border-r border-t border-gray-700 border-opacity-30 text-center">
            {formatDate(loan.returnDate)}
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
            {role === 'ROLE_ADMIN' && (
              <button
                className="group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 duration-200 ease-in-out hover:scale-105 hover:text-white active:scale-95 group-hover:from-cyan-500 group-hover:to-blue-500"
                onClick={(e) => setIsModalOpen(true)}
              >
                <span className="dark:white relative rounded-md bg-white px-5 py-2.5 text-blue-facebook transition-all duration-75 ease-in hover:text-white group-hover:bg-opacity-0">
                  {t('add_new_loan')}
                </span>
              </button>
            )}
          </div>
        </div>
        <table className="w-11/12 table-auto border-separate border-spacing-y-3 text-left">
          <thead className="h-14 bg-blue-facebook text-white shadow-md">
            <tr>
              <th className="w-40 rounded-l-md pl-3">{t('user')}</th>
              <th className="w-100">{t('book')}</th>
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
        {isModalOpen && <AddLoanModal onClose={() => setIsModalOpen(false)} />}
        {isLoanInfoOpen && (
          <LoanInfoModal
            loan={selectedLoan}
            onClose={() => setIsLoanInfoOpen(false)}
          />
        )}
        {isLoanReviewOpen && (
          <LoanReviewReaderModal
            loan={selectedLoan}
            onClose={() => setIsLoanReviewOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default LoanTable;
