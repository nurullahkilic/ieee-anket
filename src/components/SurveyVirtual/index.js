import { Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useFormik } from "formik";

// Import Swiper styles
import "swiper/css";
import "swiper/css/virtual";

import "./index.css";

import { useSwiper } from "swiper/react";

function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <>
      <button onClick={() => swiper.slidePrev()}>
        Slide to the prev slide
      </button>
      <button onClick={() => swiper.slideNext()}>
        Slide to the next slide
      </button>
    </>
  );
}

export default function SurveyVirtual() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const slides = [
    <input
      style={{ height: "100%" }}
      name="firstName"
      type="text"
      onChange={formik.handleChange}
      value={formik.values.firstName}
    />,
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Swiper
        direction={"vertical"}
        modules={[Virtual]}
        allowTouchMove={true}
        virtual
      >
        {slides.map((slideContent, index) => (
          <SwiperSlide key={slideContent} virtualIndex={index}>
            {slideContent}
          </SwiperSlide>
        ))}
      </Swiper>
    </form>
  );
}
