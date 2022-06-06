import { useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Tabs } from '../components/layouts';
import Finder from '../components/_organisms/Finder/Finder';

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState('finder');

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Campground Finder</h1>
        <Tabs
          tabs={[
            {
              id: 'finder',
              title: 'Finder',
              selected: selectedTab === 'finder',
              onSelect: () => setSelectedTab('finder'),
              component: <Finder />,
            },
            {
              id: 'favourites',
              title: 'Favourites',
              selected: selectedTab === 'favourites',
              onSelect: () => setSelectedTab('favourites'),
              component: <h1>TODO</h1>,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
