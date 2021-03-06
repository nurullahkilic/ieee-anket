// Import Swiper React components
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { getDatabase, ref, set } from "firebase/database";

import { useAuth } from "../../context/UserContext";

import SurveyInner from "../SurveyInner";

import WnextLogo from "../../assets/wnext.png";
import WdataLogo from "../../assets/wdata.png";

import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./index.css";

function Survey() {
  function writeUserData(user, values) {
    const db = getDatabase();
    set(ref(db, "users/" + user.uid), {
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName,
      ...values,
    });
  }
  
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      city: "",
      state: "",
      age: "",
      gender: "",
      isAlone: "",
      category: "",
      place1: "",
      place2: "",
      place3: "",
      place4: "",
      place5: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      writeUserData(user, values);
    },
  });

  const [cities, setCities] = useState([]);
  const [distict, setDistict] = useState([]);
  const [weather, setWeather] = useState([]);
  const [category, setCategories] = useState([]);
  const [getplace, setGetplaces] = useState([]);

  
  useEffect(() => {
    const cityUrl = `https://wdatamaterial.ieeeiuc.com/api/city`;
    const weatherUrl = `https://wdatamaterial.ieeeiuc.com/api/weather`;
    const categoryUrl = `https://wdatamaterial.ieeeiuc.com/api/category`;
    const getplaceUrl = `https://wdatamaterial.ieeeiuc.com/api/getplace/`;
    axios
    .get(weatherUrl)
    .then((res) => {
      setWeather(res.data);
      // console.log(res.data.weather);
    })
    .catch((error) => {
      console.log(error);
    });
    axios
    .get(cityUrl)
    .then((res) => {
      setCities(res.data["message"]);
      //console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
    axios
    .get(categoryUrl)
    .then((res) => {
      setCategories(res.data["message"]);
      // console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
    axios
    .get(getplaceUrl+(values.city ? values.city : "ANKARA"))
    .then((res) => {
      setGetplaces(res.data);
      // console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  
  useEffect(()=>{
    const distictUrl = `https://wdatamaterial.ieeeiuc.com/api/distict/`;
    axios
      .get(distictUrl+(values.city ? values.city : "ANKARA"))
      .then((res) => {
        setDistict(res.data);
        //console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    
  },[values.city])


  const { user, signOutGoogle } = useAuth();

  const navigate = useNavigate();

  const [pageCount, setActiveIndex] = useState(0);

  useEffect(() => {
    if (user.length === 0) {
      navigate("/");
    }
  }, [user, navigate]);

  //const cityList = ["??stanbul", "??zmir", "Ankara"];
  //const stateList = ["Avc??lar", "Konak", "K??z??lay"];
  const ageList = ["0-18", "18-30", "30-45", "45-60", "+60"];
  const genderList = ["Erkek", "Kad??n", "Belirtmek istemiyorum"];
  const groupList = ["Yaln??z??m", "??ift", "Aile", "Arkada??lar"];
  const transportationList = ["Toplu ta????ma", "??zel ara??", "Yaya"];
  //const categoryList = [
  //  "Havaalan??",
  //   "E??lence Park??",
  //   "Akvaryum",
  //   "Sanat",
  //   "Bar",
  //   "Kitap????",
  //   "Kafe",
  //   "Kamp Alan??",
  //   "Kilise",
  //   "Belediye Binas??",
  //   "K??t??phane",
  //   "Cami",
  //   "Tiyatro",
  //   "M??ze",
  //   "Gece Kul??b??",
  //   "Park",
  //   "Restoran",
  //   "Al????veri?? Merkezi",
  //   "Turistik Yerler",
  //   "Hayvanat Bah??esi",
  // ];
  // const placesList = ["Galata Kulesi", "K??z Kulesi", "Be??ikta?? ??ar????"];


  return (
    <>
      <div className="navbar">
        <div className="navbar-right">
          <img src={user.photoURL} alt={user.displayName} />
          <h3>{user.displayName}</h3>
        </div>

        <button onClick={signOutGoogle} className="navbar-exit">
          ??IKI?? YAP
        </button>
      </div>

      <div className="image-content">
        <img
          src={WnextLogo}
          alt="WNEXT"
          className={pageCount !== 0 ? " wnext-logo" : "wnext-logo hidden"}
        />
      </div>

      <form id="myform" onSubmit={handleSubmit}></form>
      <Swiper
        direction={"vertical"}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="mySwiper"
        allowTouchMove={true}
      >
        <SwiperSlide>
          <SurveyInner
            image={<img src={WdataLogo} alt="WNEXT" className="wdata-logo" />}
            bgTitle="Ho?? geldin!"
            mdTitle="Hadi seninle bir senaryoya ba??layal??m."
            prevButtonShow={false}
          ></SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner
            mdTitle="WNEXT???in teknofest maceras??nda yapay zekan??n bir par??as?? olmak i??in
            l??tfen devam et."
          />
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Kendi hikayeni planlaman?? istiyoruz." />
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Haz??rsan sorulara ba??layal??m." />
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Gezintiye ba??lamak i??in ??ehir ve il??e se??.">
            <label className="custom-select" htmlFor="styledSelect1">
              <select
                id="styledSelect1"
                name="city"
                value={values.city}
                type="select"
                onChange={handleChange}
              >
                {cities && cities.map((data,index) => (
                  <option key={index}>{data["city"]}</option>
                ))}

                {/* <option style={{ display: "none" }}></option>
                <option>{cityList[0]}</option>
                <option>{cityList[1]}</option>
                <option>{cityList[2]}</option> */}
              </select>
            </label>

            <label className="custom-select" htmlFor="styledSelect1">
              <select
                id="styledSelect1"
                name="state"
                value={values.state}
                type="select"
                onChange={handleChange}
              >
                {distict && distict.map((data,index) => (
                  <option key={index}>{data}</option>
                ))}
              </select>
            </label>

            {/* <TextField
              autoComplete="new-password"
              className="text-field"
              id="standard-basic"
              variant="standard"
              color="primary"
              placeholder="Bir ??eyler yaz..."
              form="myform"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.city}
            /> */}
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="G??zel. Seni biraz daha yak??ndan tan??mak istiyoruz." />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="L??tfen ya????n?? se??.">
            <label className="custom-select" htmlFor="styledSelect1">
              <select
                id="styledSelect1"
                name="age"
                value={values.age}
                type="select"
                onChange={handleChange}
              >
                <option>{ageList[0]}</option>
                <option>{ageList[1]}</option>
                <option>{ageList[2]}</option>
                <option>{ageList[3]}</option>
                <option>{ageList[4]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Cinsiyetini se??.">
            <label className="custom-select" htmlFor="styledSelect2">
              <select
                id="styledSelect2"
                name="gender"
                value={values.gender}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{genderList[0]}</option>
                <option>{genderList[1]}</option>
                <option>{genderList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Tatilini kiminle yap??yorsun?">
            <label className="custom-select" htmlFor="styledSelect2">
              <select
                id="styledSelect3"
                name="isAlone"
                value={values.isAlone}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{groupList[0]}</option>
                <option>{groupList[1]}</option>
                <option>{groupList[2]}</option>
                <option>{groupList[3]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Ula????m ??eklini se??.">
            <label className="custom-select" htmlFor="styledSelect2">
              <select
                id="styledSelect3"
                name="transportation"
                value={values.transportation}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{transportationList[0]}</option>
                <option>{transportationList[1]}</option>
                <option>{transportationList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Hmm. Anl??yorum." />
        </SwiperSlide>

        <SwiperSlide>



          <SurveyInner>
            <h1>Hava ??u an <span className="weather">{weather.weather}</span> <span className="temperature">{weather.temperature}??C</span></h1>
          </SurveyInner>







          {/* {weather.map((weather) => (
                  <h3 key={weather}>{weather.weather}</h3> 
                  
                ))} */}
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="??imdi tatilinin temas??na karar verme zaman??.">
            <label className="custom-select" htmlFor="styledSelect4">
              <select
                id="styledSelect4"
                name="category"
                value={values.category}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }} ></option>
                {category && category.map((data,index) => (
                  <option key={index}>{data["main_category"]}</option>
                ))}
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Bu ko??ullar alt??nda nereleri gezmek istersin?" />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner title="1. Se??im">
            <label className="custom-select" htmlFor="styledSelect5">
              <select
                id="styledSelect5"
                name="place1"
                value={values.place1}
                type="select"
                onChange={handleChange}
              >
              <option style={{ display: "none" }} >L??tfen bir mekan se??iniz.</option>
                {getplace && getplace.map((data,index) => (
                  <option key={index}>{data["place_name"]}</option>
                ))}
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="2. Se??im">
            <label className="custom-select" htmlFor="styledSelect6">
              <select
                id="styledSelect6"
                name="place2"
                value={values.place2}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }} >L??tfen bir mekan se??iniz.</option>
                {getplace && getplace.map((data,index) => (
                  <option key={index}>{data["place_name"]}</option>
                ))}
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="3. Se??im">
            <label className="custom-select" htmlFor="styledSelect6">
              <select
                id="styledSelect6"
                name="place3"
                value={values.place3}
                type="select"
                onChange={handleChange}
              >
               <option style={{ display: "none" }} >L??tfen bir mekan se??iniz.</option>
                {getplace && getplace.map((data,index) => (
                  <option key={index}>{data["place_name"]}</option>
                ))}
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="4. Se??im">
            <label className="custom-select" htmlFor="styledSelect7">
              <select
                id="styledSelect6"
                name="place4"
                value={values.place4}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }} >L??tfen bir mekan se??iniz.</option>
                {getplace && getplace.map((data,index) => (
                  <option key={index}>{data["place_name"]}</option>
                ))}
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="5. Se??im">
            <label className="custom-select" htmlFor="styledSelect8">
              <select
                id="styledSelect5"
                name="place5"
                value={values.place5}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }} >L??tfen bir mekan se??iniz.</option>
                {getplace && getplace.map((data,index) => (
                  <option key={index}>{data["place_name"]}</option>
                ))}
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Kat??ld??????n i??in te??ekk??r ederiz." />
        </SwiperSlide>

        <SwiperSlide>
          <button
            form="myform"
            type="submit"
            className="submit-button"
            onClick={() => window.location.reload()}
          >
            G??NDER
          </button>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Survey;
