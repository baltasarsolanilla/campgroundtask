import { CampgroundsMock } from '../../mockData/campgroundsToObject';
import styles from './Favourites.module.css';

const data = CampgroundsMock.slice(0, 20);
export default function Favourites() {
  return (
    <div className='mt-5'>
      <div
        className={`row row-cols-2 gx-4 gy-4 w-100 ${styles.favouriteContainer}`}
      >
        {data.map((campground) => {
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
        })}
      </div>
    </div>
  );
}
