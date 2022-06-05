/* eslint-disable react/jsx-key */
import { useTable, useSortBy } from 'react-table';
import styles from './Table.module.css';

export default function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className='table table-striped'>
        <thead className={styles.tableFixHead}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className={styles.tableHeader}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span className='ms-2'>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className='bi bi-arrow-down' />
                      ) : (
                        <i className='bi bi-arrow-up' />
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
