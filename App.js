// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api/customers');
      setData(result.data);
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'S.No.',
        accessor: 'sno',
      },
      {
        Header: 'Customer Name',
        accessor: 'customer_name',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Location',
        accessor: 'location',
      },
      {
        Header: 'Date',
        accessor: 'created_at',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: 'Time',
        accessor: 'created_at',
        Cell: ({ value }) => new Date(value).toLocaleTimeString(),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {Math.ceil(data.length / 20)}
          </strong>{' '}
        </span>
      </div>
    </div>
  );
}

export default App;
