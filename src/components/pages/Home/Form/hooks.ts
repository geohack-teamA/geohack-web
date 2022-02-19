import { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';

export type FormValue = {
  floorLevel: number;
  disabilityOnFamily: boolean;
  hasSafeRelative: boolean;
  enoughStock: boolean;
};

export default ({ onSubmit }: { onSubmit?: (value: FormValue) => void }) => {
  const handleSubmit = useCallback(
    (formValues: FormValue) => {
      onSubmit?.(formValues);
    },
    [onSubmit],
  );

  const validationSchema = Yup.object({
    floorLevel: Yup.number().required(`Required`),
    disabilityOnFamily: Yup.bool().required(`requireed`),
    enoughStock: Yup.bool().required(`required`),
  });

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
    handleSubmit,
    validationSchema,
    slideIndex,
    handleNextSlide,
    handlePrevSlide,
    totalSlides,
    slideRef,
  };
};
