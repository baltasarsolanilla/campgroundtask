import { useState, useEffect } from 'react';
import { SearchBar } from '../../_atoms';
import { CampgroundsMock } from '../../mockData/campgroundsToObject';
import { isPartialMatch } from '../../utils';
import { CampgroundTable, Map } from '../../_molecules';
import styles from './Finder.module.css';

const dataTable = CampgroundsMock.slice(0, 100);

interface FinderProps {
  campgrounds?: any[];
}

export default function Finder({ campgrounds }: FinderProps) {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(dataTable);
  const [filteredData, setFilteredData] = useState(dataTable);
  const [tableView, setTableView] = useState(true);

  useEffect(() => {
    searchResults();
  }, [data]);

  const searchResults = () => {
    if (!searchText) {
      return setFilteredData(data);
    }
    // TODO: update threshold to 0.6 when no more testing
    const threshold = 0.2;
    const newData = data.filter((campground) => {
      const { ASSET_DESC, PARK_NAME } = campground.properties;
      return (
        isPartialMatch(searchText, ASSET_DESC, threshold) ||
        isPartialMatch(searchText, PARK_NAME, threshold)
      );
    });
    setFilteredData(newData);
  };

  const addFavourite = (campground: any) => {
    const newData = data.map((c) =>
      c.id === campground.id ? { ...c, favourite: true } : { ...c }
    );
    setData(newData);
  };

  const removeFavourite = (campground: any) => {
    const newData = data.map((c) =>
      c.id === campground.id ? { ...c, favourite: false } : { ...c }
    );
    setData(newData);
  };

  return (
    <div className={styles.finderContainer}>
      <SearchBar
        value={searchText}
        onSearch={searchResults}
        onChange={setSearchText}
      />
      {tableView ? (
        <CampgroundTable data={filteredData} totalItems={data.length} />
      ) : (
        <Map
          data={filteredData}
          addFavourite={(campground: any) => addFavourite(campground)}
          removeFavourite={(campground: any) => removeFavourite(campground)}
        />
      )}
      <button
        type='button'
        className={`btn btn-secondary ${styles.viewButton}`}
        onClick={() => setTableView((v) => !v)}
      >
        {tableView ? (
          <>
            Show map <i className='bi bi-map-fill'></i>
          </>
        ) : (
          <>
            Show table <i className='bi bi-table'></i>
          </>
        )}
      </button>
    </div>
  );
}
