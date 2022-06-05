import { useMemo } from 'react';
import { Table } from '../Table';

interface CampgroundTableProps {
  data: any[];
  totalItems: number;
}

export default function CampgroundTable({ data, totalItems }: CampgroundTableProps) {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'properties.PARK_NAME',
      },
      {
        Header: 'Description',
        accessor: 'properties.ASSET_DESC',
      },
      {
        Header: 'Sitename',
        accessor: 'properties.SITE_NAME',
      },
      {
        Header: () => (
          <div className='d-inline-block text-center'>Heritage</div>
        ),
        accessor: 'properties.HERITAGE_V',
        Cell: (row) => (
          <>
            {row.value === 'Yes' ? (
              <i className='bi bi-check2' />
            ) : row.value === 'No' ? (
              <i className='bi bi-x-lg' />
            ) : (
              '-'
            )}
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Table columns={columns} data={data} />
      {totalItems === 0 ? (
        <div className='text-center m-5'>The are no campgrounds.</div>
      ) : data.length === 0 ? (
        <div className='text-center m-5'>
          No campgrounds match your search criteria.
        </div>
      ) : null}
      {totalItems > 0 && (
        <p>
          Showing <span className='text-primary'>{data.length}</span> of{' '}
          <span className='text-primary'>{totalItems}</span> total items
        </p>
      )}
    </>
  );
}
