import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Table = ({ data, columnNames }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Function to delete a row
  const handleDeleteRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData); // Assuming you have a state setter function named `setData` passed as a prop from a parent component
  };

  // Filtered and paginated data
  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value !== null && value !== undefined && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const indexOfLastRow = currentPage * 6;
  const indexOfFirstRow = indexOfLastRow - 6;
  const currentPageData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const changePage = (page) => {
    setCurrentPage(page);
  };

  // Previous button
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next button
  const nextPage = () => {
    if (indexOfLastRow < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Pagination buttons
  const paginationButtons = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / 6); i++) {
    const className = `flex h-10 w-10 items-center justify-center text-sm border ${
      i === 1 ? 'rounded-l-md' : ''} ${
      i === Math.ceil(filteredData.length / 6) ? 'rounded-r-md' : ''} ${
      i === currentPage ? 'bg-blue-600 border-blue-600 text-white z-10' : 'hover:bg-gray-100'} ${
      i === Math.ceil(filteredData.length / 6) + 1 ? 'text-gray-300' : ''}`;
    paginationButtons.push(
      <button
        key={i}
        className={className}
        onClick={() => changePage(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Table</h2>
      {/* Search input */}
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only"></label>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" aria-hidden="true" style={{ marginTop: '-1.25rem' }} /> {/* Adjusted position of the icon */}
          </div>
          <input
            type="text"
            id="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-14 pr-10 text-lg outline-2 placeholder:text-gray-500"
            style={{ marginBottom: '20px', height: '3rem', borderRadius: '0.25rem', borderColor: '#ccc' }}
          />
        </div>
      </div>
      <table className="table-auto border-collapse border border-gray-400" style={{ fontFamily: 'Lusitana', minWidth: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0' }}>
        {/* Table header */}
        <thead style={{ backgroundColor: '#f7fafc', color: '#4a5568' }}>
          <tr>
            {columnNames.map((columnName, index) => (
              <th key={index} style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' }}>{columnName}</th>
            ))}
            <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' }}></th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {currentPageData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnNames.map((columnName, cellIndex) => (
                <td key={cellIndex} style={{ padding: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>{row[columnName]}</td>
              ))}
              <td style={{ padding: '0.60rem', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                <button className="rounded-md border p-2 hover:bg-gray-100" onClick={() => handleDeleteRow(indexOfFirstRow + rowIndex)} style={{ backgroundColor: 'white', borderColor: '#ccc', borderRadius: '0.25rem', border: '1px solid #ccc' }}>
                  <span className="sr-only"></span>
                  <TrashIcon className="w-4 h-4" style={{ width: '1rem', height: '1.75rem' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex items-center justify-center mt-4">
        <button className="rounded-md border p-2 hover:bg-gray-100" onClick={prevPage} disabled={currentPage === 1} style={{ backgroundColor: 'white', borderColor: '#ccc', borderRadius: '0.25rem', border: '1px solid #ccc' }}>
          <span className="sr-only">Previous</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path></svg>
        </button>
        {paginationButtons}
        <button className="rounded-md border p-2 hover:bg-gray-100" onClick={nextPage} disabled={indexOfLastRow === filteredData.length} style={{ backgroundColor: 'white', borderColor: '#ccc', borderRadius: '0.25rem', border: '1px solid #ccc' }}>
          <span className="sr-only">Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default Table;
