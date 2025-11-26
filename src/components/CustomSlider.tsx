import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"];

const CustomSlider = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
  };

  useEffect(() => {
    const sliderEl = sliderRef.current?.innerSlider?.list;
    if (!sliderEl) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY > 0) {
        sliderRef.current?.slickNext();
      } else {
        sliderRef.current?.slickPrev();
      }
    };

    sliderEl.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      sliderEl.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Slider ref={sliderRef} {...settings} className="h-screen">
        {images.map((src, idx) => (
          <div key={idx} className="w-screen h-screen">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomSlider;
