import { useEffect, useState } from 'react';

export type Position = {
  lat: number;
  lng: number;
};

export default () => {
  const [currentLocation, setCurrentLocation] = useState<Position>();
  const [locationErr, setLocationErr] = useState<string>();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        setCurrentLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (posErr: GeolocationPositionError) => {
        setLocationErr(posErr.message);
      },
    );
  }, []);

  const getGeoLocation = (): Position | undefined => {
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        return { lat: pos.coords.latitude, lng: pos.coords.longitude };
      },
      (posErr: GeolocationPositionError) => {
        console.log(`ERR:`, posErr.message);
        return undefined;
      },
    );
    return;
  };

  useEffect(() => {
    console.log(locationErr);
  }, [locationErr]);

  useEffect(() => {
    console.log(`loc-----`, currentLocation);
  }, [currentLocation]);

  return {
    getGeoLocation,
    currentLocation,
  };
};
