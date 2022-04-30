// Import Swiper React components
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { getDatabase, ref, set } from "firebase/database";

import { useAuth } from "../../context/UserContext";

import SurveyInner from "../SurveyInner";

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

  const { user, signOutGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.length === 0) {
      navigate("/");
    }
  }, [user, navigate]);

  const ageList = ["0-18", "18-30", "30-45", "45-60", "+60"];
  const genderList = ["Erkek", "Kadın", "Belirtmek istemiyorum"];
  const groupList = ["Yalnızım", "Çift", "Aile", "Arkadaşlar"];
  const categoryList = [
    "Havaalanı",
    "Eğlence Parkı",
    "Akvaryum",
    "Sanat",
    "Bar",
    "Kitapçı",
    "Kafe",
    "Kamp Alanı",
    "Kilise",
    "Belediye Binası",
    "Kütüphane",
    "Cami",
    "Tiyatro",
    "Müze",
    "Gece Kulübü",
    "Park",
    "Restoran",
    "Alışveriş Merkezi",
    "Turistik Yerler",
    "Hayvanat Bahçesi",
  ];
  const placesList = ["Galata Kulesi", "Kız Kulesi", "Beşiktaş Çarşı"];

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
      place6: "",
      place7: "",
      place8: "",
      place9: "",
      place10: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      writeUserData(user, values);
    },
  });

  return (
    <>
      <div className="navbar">
        <div className="navbar-right">
          <img src={user.photoURL} alt={user.displayName} />
          <h3>{user.displayName}</h3>
        </div>

        <button onClick={signOutGoogle} className="navbar-exit">
          ÇIKIŞ YAP
        </button>
      </div>
      <form id="myform" onSubmit={handleSubmit}></form>
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
            prevButtonShow={false}
          ></SurveyInner>
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
          <SurveyInner mdTitle="Hazırsan sorulara başlayalım." />
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Gezintiye başlamak için şehir ve ilçe seç.">
            <input
              name="city"
              value={values.city}
              type="text"
              placeholder="Şehir"
              onChange={handleChange}
            />

            <input
              name="state"
              value={values.state}
              type="text"
              placeholder="İlçe"
              onChange={handleChange}
            />

            {/* <TextField
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
              value={formik.values.city}
            /> */}
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Güzel." />
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Seni biraz daha yakından tanımak istiyoruz." />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Lütfen yaşını seç.">
            <label className="custom-select" htmlFor="styledSelect1">
              <select
                id="styledSelect1"
                name="age"
                value={values.age}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
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
          <SurveyInner mdTitle="Cinsiyetini seç.">
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
          <SurveyInner mdTitle="Tatilini kiminle yapıyorsun?">
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
          <SurveyInner mdTitle="Hmm. Anlıyorum." />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Hava {Temperature} {Weather}." />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Şimdi tatilinin temasına karar verme zamanı.">
            <label className="custom-select" htmlFor="styledSelect4">
              <select
                id="styledSelect4"
                name="category"
                value={values.category}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{categoryList[0]}</option>
                <option>{categoryList[1]}</option>
                <option>{categoryList[2]}</option>
                <option>{categoryList[3]}</option>
                <option>{categoryList[4]}</option>
                <option>{categoryList[5]}</option>
                <option>{categoryList[6]}</option>
                <option>{categoryList[7]}</option>
                <option>{categoryList[8]}</option>
                <option>{categoryList[9]}</option>
                <option>{categoryList[10]}</option>
                <option>{categoryList[11]}</option>
                <option>{categoryList[12]}</option>
                <option>{categoryList[13]}</option>
                <option>{categoryList[14]}</option>
                <option>{categoryList[15]}</option>
                <option>{categoryList[16]}</option>
                <option>{categoryList[17]}</option>
                <option>{categoryList[18]}</option>
                <option>{categoryList[19]}</option>
                <option>{categoryList[20]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Bu koşullar altında nereleri gezmek istersin?" />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner title="1. Seçim">
            <label className="custom-select" htmlFor="styledSelect5">
              <select
                id="styledSelect5"
                name="place1"
                value={values.place1}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="2. Seçim">
            <label className="custom-select" htmlFor="styledSelect6">
              <select
                id="styledSelect6"
                name="place2"
                value={values.place2}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="3. Seçim">
            <label className="custom-select" htmlFor="styledSelect6">
              <select
                id="styledSelect6"
                name="place3"
                value={values.place3}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="4. Seçim">
            <label className="custom-select" htmlFor="styledSelect7">
              <select
                id="styledSelect6"
                name="place4"
                value={values.place4}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="5. Seçim">
            <label className="custom-select" htmlFor="styledSelect8">
              <select
                id="styledSelect5"
                name="place5"
                value={values.place5}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="6. Seçim">
            <label className="custom-select" htmlFor="styledSelect9">
              <select
                id="styledSelect9"
                name="place6"
                value={values.place6}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="7. Seçim">
            <label className="custom-select" htmlFor="styledSelect10">
              <select
                id="styledSelect10"
                name="place7"
                value={values.place7}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="8. Seçim">
            <label className="custom-select" htmlFor="styledSelect11">
              <select
                id="styledSelect11"
                name="place8"
                value={values.place8}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="9. Seçim">
            <label className="custom-select" htmlFor="styledSelect12">
              <select
                id="styledSelect12"
                name="place9"
                value={values.place9}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="10. Seçim">
            <label className="custom-select" htmlFor="styledSelect13">
              <select
                id="styledSelect13"
                name="place10"
                value={values.place10}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Katıldığın için teşekkür ederiz." />
        </SwiperSlide>

        <SwiperSlide>
          <button form="myform" type="submit" className="submit-button">
            GÖNDER
          </button>
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
      </Swiper>
    </>
  );
}

export default Survey;
