import "./index.css";

import { useSwiper } from "swiper/react";

function SurveyInner({ bgTitle, mdTitle, title, children }) {
  const swiper = useSwiper();
  return (
    <div className="content">
      {bgTitle && <div className="bg-title">{bgTitle}</div>}
      {mdTitle && <div className="md-title">{mdTitle}</div>}
      {title && <div className="title">{title}</div>}
      {children}
      <button className="next-button" onClick={() => swiper.slideNext()}>
        DEVAM ET
      </button>
    </div>
  );
}

export default SurveyInner;
