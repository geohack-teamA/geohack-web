import { END_POINT } from '@geohack/const';
import { useCallback, useEffect, useState } from 'react';
import { FormValue } from './Form/hooks';
export type ResponseData = {
  shouldEvacuate: boolean;
  message: string;
  nearestShelter: Shelter;
  userBuilding?: Building;
};

type Shelter = {
  name?: string;
  lat?: string;
  lng?: string;
};

type Building = {
  id: string;
  storeysAboveGround: number;
  height: number;
  depth: number;
  depthRank: number;
};

export type Position = {
  lat: number;
  lng: number;
};

export default () => {
  const [isGeoLocationActive, activateGeoLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Position>();
  const [locationErr, setLocationErr] = useState<string>();
  const [resData, setResData] = useState<ResponseData>();
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'form' | 'result'>(`form`);
  useEffect(() => {
    if (!isGeoLocationActive) return;
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
  }, [isGeoLocationActive]);

  const handleGeoLocationGet = useCallback(() => {
    console.log(`click`);
    activateGeoLocation(true);
    setIsGettingLocation(true);
  }, [activateGeoLocation, setIsGettingLocation]);

  useEffect(() => {
    if (!isGeoLocationActive || !currentLocation) return;
    setIsGettingLocation(false);
  }, [setIsGettingLocation, isGeoLocationActive, currentLocation]);

  useEffect(() => {
    console.log(currentLocation);
  }, [currentLocation]);

  const handleSubmit = useCallback(
    async (values: FormValue) => {
      if (!currentLocation) {
        alert(`位置情報がない場合判定結果を取得することができません。`);
        return;
      }
      setLoading(true);
      const reqObj = {
        lat: currentLocation?.lat,
        lng: currentLocation?.lng,
        currentLevel: values.floorLevel,
        hasSafeRelative: values.hasSafeRelative,
        hasDifficultFamily: values.disabilityOnFamily,
        hasEnoughStock: values.enoughStock,
      };
      try {
        const res = await fetch(`${END_POINT}/analyze`, {
          method: `POST`,
          headers: {
            'Content-Type': `application/json`,
          },
          body: JSON.stringify(reqObj),
        });
        const result: Promise<ResponseData> = res.json();
        setResData(await result);
        setMode(`result`);
      } catch (e) {
        console.error(`ERR: fail to send request`);
      } finally {
        setLoading(false);
      }
    },
    [currentLocation, setResData, setMode, setLoading],
  );

  return {
    handleGeoLocationGet,
    currentLocation,
    handleSubmit,
    mode,
    resData,
    loading: loading || isGettingLocation,
  };
};
