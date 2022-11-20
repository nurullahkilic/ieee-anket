import "./index.css";

import { useSwiper } from "swiper/react";
import ArrowBack from "../../assets/arrow.svg";

function SurveyInner({
  image,
  bgTitle,
  mdTitle,
  title,
  prevButtonShow,
  nextButtonShow,
  children,
}) {
  const swiper = useSwiper();
  return (
    <div className="content">
      {image && image}
      {bgTitle && <div className="bg-title">{bgTitle}</div>}
      {mdTitle && <div className="md-title">{mdTitle}</div>}
      {title && <div className="title">{title}</div>}
      {children}
    
      <div className="buttons">
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
