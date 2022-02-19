import { FormikHelpers } from 'formik';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

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

  const validationSchema = Yup.object({
    floorLevel: Yup.number().required(`Required`),
    disabilityOnFamily: Yup.bool().required(`requireed`),
    enoughStock: Yup.bool().required(`required`),
  });

  const handleSubmit = useCallback(
    async (values: FormValue, helpers: FormikHelpers<FormValue>) => {
      if (!currentLocation) {
        alert(`location must be turned on`);
        return;
      }
      const reqObj = {
        lat: currentLocation?.lat,
        lng: currentLocation?.lng,
        currentLevel: values.floorLevel,
        hasDifficultFamily: values.disabilityOnFamily,
        hasEnoughStock: values.enoughStock,
      };
      const res = await fetch(`http://localhost:8000/analyze`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
        },
        body: JSON.stringify(reqObj),
      });
      const result = res.json();
    },
    [],
  );

  const [slideIndex, setSlideIndex] = useState(1);

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
    getGeoLocation,
    currentLocation,
    handleSubmit,
    handleNextSlide,
    handlePrevSlide,
    totalSlides,
    slideIndex,
    slideRef,
    validationSchema,
  };
};
