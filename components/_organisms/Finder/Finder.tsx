import { useState, useEffect } from 'react';
import { SearchBar } from '../../_atoms';
import { isPartialMatch } from '../../utils';
import { CampgroundTable, Map } from '../../_molecules';
import styles from './Finder.module.css';


interface FinderProps {
  campgrounds: any[];
}

export default function Finder({ campgrounds = [] }: FinderProps) {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(campgrounds);
  const [tableView, setTableView] = useState(true);
  

  useEffect(() => {
    searchResults();
  }, [campgrounds]);

  const searchResults = () => {
    if (!searchText) {
      return setFilteredData(campgrounds);
    }
    // TODO: update threshold to 0.6 when no more testing
    const threshold = 0.2;
    const newData = campgrounds.filter((campground) => {
      const { ASSET_DESC, PARK_NAME } = campground.properties;
      return (
        isPartialMatch(searchText, ASSET_DESC, threshold) ||
        isPartialMatch(searchText, PARK_NAME, threshold)
      );
    });
    setFilteredData(newData);
  };


  return (
    <div className={styles.finderContainer}>
      <SearchBar
        value={searchText}
        onSearch={searchResults}
        onChange={setSearchText}
      />
      {tableView ? (
        <CampgroundTable data={filteredData} totalItems={campgrounds.length} />
      ) : (
        <Map
          data={filteredData}
          addFavourite={(campground: any) => console.log(campground)}
          removeFavourite={(campground: any) => console.log(campground)}
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
