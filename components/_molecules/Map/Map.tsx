import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

type LatLngLiteral = google.maps.LatLngLiteral;

const containerStyle = {
  width: '100%',
  height: '60vh',
};

interface MapProps {
  data: any[];
}

export default function Map({ data }: MapProps) {
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: -25.274399, lng: 133.775131 }),
    []
  );

  // Workaround to show markers on load, until find a better way
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
              {Math.random() > 0.5 ? (
                <button
                  className='btn btn-link'
                  onClick={() => console.log('Remove from favorites campground', selectedCamp)}
                  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Remove from favourites"
                >
                  <i className='bi bi-heart-fill'></i>
                </button>
              ) : (
                <button
                  className='btn btn-link'
                  onClick={() => console.log('Add to favorites campground', selectedCamp)}
                  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Add to favourites"
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
