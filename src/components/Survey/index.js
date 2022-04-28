// Import Swiper React components
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFormik } from "formik";
import {
  TextField,
  Autocomplete,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import SurveyInner from "../SurveyInner";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./index.css";

import { useSwiper } from "swiper/react";

function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button onClick={() => swiper.slideNext()}>Slide to the next slide</button>
  );
}

function Survey() {
  const [value, setValue] = useState("");
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

  return (
    <>
      <form id="myform" onSubmit={formik.handleSubmit}></form>
      <Swiper
        direction={"vertical"}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="mySwiper"
        allowTouchMove={true}
      >
        <SwiperSlide>
          <SurveyInner
            bgTitle="Hoş geldin!"
            mdTitle="Hadi seninle bir senaryoya başlayalım."
          />
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner
            mdTitle="WNEXT’in teknofest macerasında yapay zekanın bir parçası olmak için
            lütfen devam et."
          />
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Kendi hikayeni planlamanı istiyoruz." />
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Bla bla bla flan!">
            <TextField
              autoComplete="new-password"
              className="text-field"
              id="standard-basic"
              variant="standard"
              color="primary"
              placeholder="Bir şeyler yaz..."
              form="myform"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Bla bla bla flan!">
            <FormControl
              sx={{ m: 1, minWidth: 120, backgroundColor: "white" }}
              size="small"
            >
              <InputLabel id="demo-select-small">Age</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={value}
                label="Age"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </SurveyInner>
        </SwiperSlide>
        {/* <SwiperSlide>
          <SurveyInner mdTitle="Bla bla bla flan!">
            <Autocomplete
              id="lastName"
              options={[
                "The Godfather",
                "Pulp Fiction2",
                "Pulp Fiction3",
                "Pulp Fiction4",
                "Pulp Fiction5",
                "Pulp Fiction6",
                "Pulp Fiction7",
              ]}
              style={{ width: "100%" }}
              name="lastName"
              onChange={(e, newValue) => {
                formik.values.lastName = newValue;
              }}
              value={formik.values.lastName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  autoComplete="new-password"
                />
              )}
            />
          </SurveyInner>
        </SwiperSlide> */}
        <SwiperSlide>
          <button form="myform" type="submit">
            Submit
          </button>
        </SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}

export default Survey;
