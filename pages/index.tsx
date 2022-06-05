import { useState } from 'react';
import type { NextPage } from 'next';
import { SearchBar } from '../components/_atoms';
import styles from '../styles/Home.module.css';
import { CampgroundsMock } from '../components/mockData/campgroundsToObject';
import { isPartialMatch } from '../components/utils';
import { CampgroundTable, Map } from '../components/_molecules';

const dataTable = CampgroundsMock.slice(0, 100);

const Home: NextPage = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(dataTable);
  const [tableView, setTableView] = useState(true);

  const searchResults = () => {
    if (!searchText) {
      return setFilteredData(dataTable);
    }
    const threshold = 0.2;
    const newData = dataTable.filter((campground) => {
      const { ASSET_DESC, PARK_NAME } = campground.properties;
      return (
        isPartialMatch(searchText, ASSET_DESC, threshold) ||
        isPartialMatch(searchText, PARK_NAME, threshold)
      );
    });
    setFilteredData(newData);
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Campground Finder</h1>
        <SearchBar
          value={searchText}
          onSearch={searchResults}
          onChange={setSearchText}
        />
        {tableView ? (
          <CampgroundTable data={filteredData} totalItems={dataTable.length} />
        ) : (
          <Map data={filteredData} />
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
      <div></div>
    </div>
  );
};

export default Home;
