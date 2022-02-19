import { END_POINT } from '@geohack/const';
import { FormikHelpers } from 'formik';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

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

export type FormValue = {
  floorLevel: number;
  disabilityOnFamily: boolean;
  hasSafeRelative: boolean;
  enoughStock: boolean;
};

export default () => {
  const [isGeoLocationActive, activateGeoLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Position>();
  const [locationErr, setLocationErr] = useState<string>();
  const [resData, setResData] = useState<ResponseData>();
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  // const [mode, setMode] = useState<'form' | 'result'>(`result`);
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
    activateGeoLocation(true);
    setIsGettingLocation(true);
  }, [activateGeoLocation]);

  useEffect(() => {
    if (!isGeoLocationActive || !currentLocation) return;
    setIsGettingLocation(false);
  }, [setIsGettingLocation, isGeoLocationActive, currentLocation]);
  useEffect(() => {
    console.log(locationErr);
  }, [locationErr]);

  useEffect(() => {
    console.log(`loc-----`, currentLocation);
  }, [currentLocation]);

  const validationSchema = Yup.object({
    floorLevel: Yup.number().required(`Required`),
    disabilityOnFamily: Yup.bool().required(`requireed`),
    enoughStock: Yup.bool().required(`required`),
  });

  const handleSubmit = useCallback(
    async (values: FormValue, helpers: FormikHelpers<FormValue>) => {
      if (!currentLocation) {
        alert(`位置情報がない場合判定結果を取得することができません。`);
        return;
      }
      const reqObj = {
        lat: currentLocation?.lat,
        lng: currentLocation?.lng,
        currentLevel: values.floorLevel,
        hasSafeRelative: values.hasSafeRelative,
        hasDifficultFamily: values.disabilityOnFamily,
        hasEnoughStock: values.enoughStock,
      };
      try {
        // const res = await fetch(`http://localhost:8000/analyze`, {
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
      }
    },
    [currentLocation, setResData, setMode],
  );

  const [slideIndex, setSlideIndex] = useState<number>(1);

  const slideRef = useRef(null);
  const updateSlideIndex = () => {
    if (!slideRef.current) return;
    const index: number = (slideRef.current as any).swiper.activeIndex ?? 0;
    setSlideIndex(index + 1);
  };

  const handleNextSlide = () => {
    if (!slideRef.current) return;
    (slideRef.current as any).swiper.slideNext();
    updateSlideIndex();
  };

  const handlePrevSlide = () => {
    if (!slideRef.current) return;
    (slideRef.current as any).swiper.slidePrev();
    updateSlideIndex();
  };

  const totalSlides = () => {
    if (!slideRef.current) return;
    const slides: any[] = (slideRef.current as any).swiper.slides;
    return slides.length ?? 0;
  };

  return {
    handleGeoLocationGet,
    currentLocation,
    handleSubmit,
    handleNextSlide,
    handlePrevSlide,
    totalSlides,
    slideIndex,
    slideRef,
    validationSchema,
    mode,
    resData,
    isGettingLocation,
  };
};
