import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export type Props = {
  className?: string;
};

const Swipe: React.FC<Props> = ({ className }) => {
  return (
    <Swiper
      // spaceBetween={50}
      pagination={{ type: `progressbar` }}
      slidesPerView={1}
      onSlideChange={() => console.log(`slide change`)}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
};

export default Swipe;
