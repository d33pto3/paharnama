import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Drawer from "./Drawer";
import Title from "./pahar/Title";

const mountains = [
  { mountain_img: "/images/1.jpg", name: "Himalay", description: "bacbac" },
  { mountain_img: "/images/2.jpg", name: "Keokradong", description: "pacpac" },
  { mountain_img: "/images/3.jpg", name: "dac", description: "dacdac" },
];

const Pahar = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMountain, setSelectedMountain] = useState(mountains[0]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    speed: 1500,
    afterChange: (currentIndex: number) => {
      setSelectedMountain(mountains[currentIndex]);
    },
  };

  useEffect(() => {
    const sliderEl = sliderRef.current?.innerSlider?.list;
    if (!sliderEl) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) sliderRef.current?.slickNext();
      else sliderRef.current?.slickPrev();
    };

    sliderEl.addEventListener("wheel", onWheel, { passive: false });
    return () => sliderEl.removeEventListener("wheel", onWheel);
  }, []);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  console.log("okoko", selectedMountain);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <Slider ref={sliderRef} {...settings} className="h-screen">
        {mountains.map((mountain) => (
          <div key={mountain.name} className="relative w-screen h-screen">
            <div
              className="w-full h-full bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${mountain.mountain_img})` }}
              onClick={toggleDrawer}
            />
          </div>
        ))}
      </Slider>

      <Title key={selectedMountain.name} title={selectedMountain.name} />

      <Drawer
        mountain={selectedMountain}
        isOpen={drawerOpen}
        closeDrawer={toggleDrawer}
      />
    </div>
  );
};

export default Pahar;
