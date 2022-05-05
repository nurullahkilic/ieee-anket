import "./index.css";

import { useSwiper } from "swiper/react";
import ArrowBack from "../../assets/arrow.svg";

import { useEvent } from "../../context/EventContext";

function SurveyInner({
  bgTitle,
  mdTitle,
  title,
  prevButtonShow,
  nextButtonShow,
  children,
}) {
  const { setAllowTouch } = useEvent();
  const swiper = useSwiper();
  return (
    <div className="content">
      {bgTitle && <div className="bg-title">{bgTitle}</div>}
      {mdTitle && <div className="md-title">{mdTitle}</div>}
      {title && <div className="title">{title}</div>}
      {children}
      <div
        className="buttons"
        onMouseEnter={() => setAllowTouch(false)}
        onMouseLeave={() => setAllowTouch(true)}
      >
        {prevButtonShow !== false && (
          <button className="prev-button" onClick={() => swiper.slidePrev()}>
            <img src={ArrowBack} alt="arrow-back" />
          </button>
        )}

        {nextButtonShow !== false && (
          <button className="next-button" onClick={() => swiper.slideNext()}>
            DEVAM ET
          </button>
        )}
      </div>
    </div>
  );
}

export default SurveyInner;
