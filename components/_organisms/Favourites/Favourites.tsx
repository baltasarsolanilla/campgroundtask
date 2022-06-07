import axios from 'axios';
import { useQuery } from 'react-query';
import { CampgroundsMock } from '../../mockData/campgroundsToObject';
import styles from './Favourites.module.css';

const data = CampgroundsMock.slice(0, 20);
export default function Favourites() {
  const getFavourites = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_CAMPGROUNDS_API_URL}/api/Favourite`);
    return data;
  };
  const { isLoading, data, error } = useQuery('favourites', getFavourites);

  return (
    <div className='mt-5'>
      <div
        className={`row row-cols-2 gx-4 gy-4 w-100 ${styles.favouriteContainer}`}
      >
        {isLoading ? (
          <div>Loading... </div>
        ) : (
          data.map((campground: any) => {
            return (
              <div key={campground.id} className='col'>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>
                      {campground.properties.PARK_NAME}
                    </h5>
                    <p className='card-text'>
                      {campground.properties.ASSET_DESC}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
