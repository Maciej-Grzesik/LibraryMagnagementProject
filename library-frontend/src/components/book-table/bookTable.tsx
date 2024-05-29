import React, { useEffect, useState } from 'react';
import mockData from './MockData.json';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function BookTable() {
  const [filterText, setFilterText] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5; 

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const filteredData = mockData.filter(
    (info) =>
      info.title.toLowerCase().includes(filterText.toLowerCase()) ||
      info.author.toLowerCase().includes(filterText.toLowerCase()) ||
      info.isbn.toLowerCase().includes(filterText.toLowerCase()) ||
      info.publisher.toLowerCase().includes(filterText.toLowerCase()),
  );

  const displayData = filteredData
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((info, index) => {
      return (
        <tr
          key={index}
          className={`${info.availableCopies === 0 ? 'bg-red-light-opacity-50' : index % 2 === 0 ? 'bg-blue-light-opacity-50' : 'bg-white'} 
        shadow-md hover:scale-105 ease-in-out duration-500 h-10 hover:cursor-pointer break-all`}
        >
          <td className="pl-3 rounded-l-md border-l border-t border-b border-gray-700 border-opacity-30 ">
            {info.title}
          </td>
          <td className="border-t border-b border-gray-700 border-opacity-30">
            {info.author}
          </td>
          <td className="border-t border-b border-gray-700 border-opacity-30">
            {info.isbn}
          </td>
          <td className="border-t border-b border-gray-700 border-opacity-30 text-center">
            {info.publishYear}
          </td>
          <td className="border-t border-b border-gray-700 border-opacity-30">
            {info.publisher}
          </td>
          <td className="rounded-r-md border-r border-t border-b border-gray-700 border-opacity-30 text-center">
            {info.availableCopies}
          </td>
        </tr>
      );
    });

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="mx-auto w-11/12 ">
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
      </div>
      <table className="table-auto w-11/12 border-separate border-spacing-y-3 text-left ">
        <thead className="bg-blue-facebook h-14 shadow-md text-white">
          <tr>
            <th className="rounded-l-md pl-3 w-60">Title</th>
            <th className="w-40">Author</th>
            <th className="w-32">ISBN</th>
            <th className="w-32 text-center">Year of publish</th>
            <th>Publisher</th>
            <th className="rounded-r-md text-center">Available copies</th>
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

export default BookTable;
