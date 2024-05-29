import React, { useEffect, useState } from 'react';
import mockData from './MockLoanData.json';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import Navbar from '../navbar/navbar';

function LoanTable() {
  const [filterText, setFilterText] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const filteredData = mockData.filter(
    (info) =>
      info.book.toLowerCase().includes(filterText.toLowerCase()) ||
      info.user.toLowerCase().includes(filterText.toLowerCase()) ||
      info.loan_date.includes(filterText.toLowerCase()) ||
      info.due_date.includes(filterText.toLowerCase()),
  );

  const displayData = filteredData
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((info, index) => {
      return (
        <tr
          key={index}
          className={`${info.return_date > info.due_date ? 'bg-red-light-opacity-50' : index % 2 === 0 ? 'bg-blue-light-opacity-50' : 'bg-white'} 
        shadow-md hover:scale-105 ease-in-out duration-500 h-10 hover:cursor-pointer break-all`}
        >
          <td className="pl-3 rounded-l-md border-l border-t border-b border-gray-700 border-opacity-30 ">
            {info.user}
          </td>
          <td className="border-t border-b border-gray-700 border-opacity-30">
            {info.book}
          </td>
          <td className="border-t border-b border-gray-700 border-opacity-30">
            {info.loan_date}
          </td>
          <td className="border-t border-b border-gray-700 border-opacity-30 text-center">
            {info.due_date}
          </td>
          <td className="rounded-r-md border-r border-t border-b border-gray-700 border-opacity-30 text-center">
            {info.return_date === "" ? '-------' : info.return_date}
          </td>
        </tr>
      );
    });

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-light">
      <Navbar/>
      <div className="mx-auto w-11/12 flex flex-row relative">
        <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
          <SearchIcon className="w-5 h-5 absolute ml-3 pointer-events-none"></SearchIcon>
          <input
            className="pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            type="text"
            placeholder="Search..."
            autoComplete="off"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className="absolute right-0">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-5 py-2.5 transition-all text-blue-facebook ease-in duration-75 bg-white dark:white rounded-md group-hover:bg-opacity-0 hover:text-white">
              Add New Loan
            </span>
          </button>
        </div>
      </div>
      <table className="table-auto w-11/12 border-separate border-spacing-y-3 text-left ">
        <thead className="bg-blue-facebook h-14 shadow-md text-white">
          <tr>
            <th className="rounded-l-md pl-3 w-60">User</th>
            <th className="w-40">Book</th>
            <th className="w-32">Loan Date</th>
            <th className="w-32 text-center">Due Date</th>
            <th className="rounded-r-md text-center">Return Date</th>
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
    </div>
  );
}

export default LoanTable;
