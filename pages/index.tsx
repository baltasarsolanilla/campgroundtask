import { useEffect, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Tabs } from '../components/layouts';
import { Finder, Favourites } from '../components/_organisms';
import axios from 'axios';

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState('finder');
  const [campgrounds, setCampgrounds] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_CAMPGROUNDS_API_URL}/api/campgrounds`)
      .then((res) => setCampgrounds(res.data));
  }, []);

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
              content: <Finder campgrounds={campgrounds} />,
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_CAMPGROUNDS_API_URL}/api/campgrounds`
    );
    if (data) {
      return {
        props: {
          campgrounds: data,
        },
      };
    }
  } catch (e) {
    console.log(e);
  }

  return { props: {} };
};
