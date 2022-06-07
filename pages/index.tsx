import { useEffect, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Tabs } from '../components/layouts';
import { Finder, Favourites } from '../components/_organisms';
import axios from 'axios';
import { useQuery } from 'react-query';

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState('finder');

  const getCampgrounds = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_CAMPGROUNDS_API_URL}/api/Campground`);
    return data;
  };
  const { isLoading, data, error } = useQuery('campgrounds', getCampgrounds, { select: (data) => data.features});

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
              content: <Finder campgrounds={data} />,
            },
            {
              id: 'favourites',
              title: 'Favourites',
              selected: selectedTab === 'favourites',
              onSelect: () => setSelectedTab('favourites'),
              content: <Favourites />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
