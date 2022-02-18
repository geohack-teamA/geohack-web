import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Icon from '@geohack/components/ui/Icon';

export type Props = {
  className?: string;
};

const Swipe: React.FC<Props> = ({ className }) => {
  const sw = useSwiper();
  return (
    <>
      <Icon icon="arrowLeft" m={10} onClick={() => sw.slideNext()} />

      <Swiper
        pagination={{ type: `progressbar` }}
        slidesPerView={1}
        onSlideChange={() => console.log(`slide change`)}
        onSwiper={(swiper) => console.log(swiper)}
        allowSlideNext
        allowSlidePrev
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </>
  );
};

export default Swipe;
