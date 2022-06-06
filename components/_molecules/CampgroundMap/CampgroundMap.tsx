import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

type LatLngLiteral = google.maps.LatLngLiteral;

const containerStyle = {
  width: '100%',
  height: '60vh',
};

interface CampgroundMap {
  data: any[];
  addFavourite: Function;
  removeFavourite: Function;
}

export default function CampgroundMap({
  data,
  addFavourite,
  removeFavourite,
}: CampgroundMap) {
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: -25.274399, lng: 133.775131 }),
    []
  );

  // * Workaround to render markers on load.
  const [campgrounds, setCampgrounds] = useState<any[]>([]);
  useEffect(() => {
    setCampgrounds(data);
  }, [data]);

  const [selectedCamp, setSelectedCamp] = useState<any | null>(null);

  const getCampPosition = (campground: any) => {
    const {
      geometry: { coordinates },
    } = campground;
    const [lng, lat] = coordinates;
    return { lat, lng };
  };

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
    >
      {campgrounds.map((campground) => {
        return (
          <Marker
            key={campground.id}
            position={getCampPosition(campground)}
            onClick={() => setSelectedCamp(campground)}
          />
        );
      })}

      {selectedCamp && (
        <InfoWindow
          position={getCampPosition(selectedCamp)}
          onCloseClick={() => setSelectedCamp(null)}
        >
          <div>
            <div className='d-flex align-items-baseline'>
              <h5 className='mt-2'>{selectedCamp.properties.ASSET_DESC}</h5>
              {/* // TODO: change for one button and toggle favourite value. */}
              {Math.random() > 0.5 ? (
                <button
                  className='btn btn-link'
                  onClick={() => removeFavourite(selectedCamp)}
                  data-bs-toggle='tooltip'
                  data-bs-placement='bottom'
                  title='Remove from favourites'
                >
                  <i className='bi bi-heart-fill'></i>
                </button>
              ) : (
                <button
                  className='btn btn-link'
                  onClick={() => addFavourite(selectedCamp)}
                  data-bs-toggle='tooltip'
                  data-bs-placement='bottom'
                  title='Add to favourites'
                >
                  <i className='bi bi-heart'></i>
                </button>
              )}
            </div>
            <p>{selectedCamp.properties.PARK_NAME}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
