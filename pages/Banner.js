import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/core";
SwiperCore.use([EffectCoverflow, Pagination, Navigation, Autoplay]);
import "swiper/css";

function Banner() {
  return (
    <div className="main__banner">
      <Swiper
        navigation={true}
        centeredSlides={true}
        slidesPerView="1"
        loop={true}
        autoplay={true}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide className="image_slider_change">
          <Image
            // loader={myLoader}
            src="/essets/pexels.jpg"
            alt="Picture of the author"
            width={1920}
            height={800}
            layout="responsive"
          />
        </SwiperSlide>
        <SwiperSlide className="image_slider_change">
          <Image
            // loader={myLoader}
            src="/essets/pexels-2.jpg"
            alt="Picture of the author"
            width={1920}
            height={800}
            layout="responsive"
          />
        </SwiperSlide>
        <SwiperSlide className="image_slider_change">
          <Image
            // loader={myLoader}
            src="/essets/pexels-3.png"
            alt="Picture of the author"
            width={1920}
            height={800}
            layout="responsive"
          />
        </SwiperSlide>
        <SwiperSlide className="image_slider_change">
          <Image
            // loader={myLoader}
            src="/essets/pexels-4.png"
            alt="Picture of the author"
            width={1920}
            height={800}
            layout="responsive"
          />
        </SwiperSlide>
        <SwiperSlide className="image_slider_change">
          <Image
            // loader={myLoader}
            src="/essets/pexels-5.png"
            alt="Picture of the author"
            width={1920}
            height={800}
            layout="responsive"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Banner;
