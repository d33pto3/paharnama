import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Drawer, { type Mountain } from "./Drawer";
import Title from "./pahar/Title";
import axios from "axios";

type Props = {
  drawerOpen: boolean;
  toggleDrawer: () => void;
};

const Pahar = ({ drawerOpen, toggleDrawer }: Props) => {
  const sliderRef = useRef<Slider | null>(null);

  const [mountains, setMountains] = useState<Mountain[] | []>([]);
  const [selectedMountain, setSelectedMountain] = useState<Mountain | null>(
    null
  );

  const settings = {
    dots: false,
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

  useEffect(() => {
    const getMountains = async () => {
      const res = await axios.get("http://localhost:3030/api/mountains");
      setMountains(res.data);
      setSelectedMountain(res.data[0]);
    };

    getMountains();
  }, []);



  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div
        className={`h-full transition-all duration-300 relative ${
          drawerOpen
            ? "ml-[85vw] sm:ml-[70vw] md:ml-[380px] lg:ml-[440px] xl:ml-[500px]"
            : "ml-0"
        }`}
      >
        <Slider ref={sliderRef} {...settings} className="h-screen">
          {mountains?.map((mountain: Mountain) => (
            <div key={mountain.key} className="relative w-full h-screen">
              <div
                className="w-full h-full bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${mountain.mountain_img})` }}
                onClick={toggleDrawer}
              />
            </div>
          ))}
        </Slider>

        <Title key={selectedMountain?.key} title={selectedMountain?.key} />
      </div>

      <Drawer
        mountain={selectedMountain}
        isOpen={drawerOpen}
        closeDrawer={toggleDrawer}
      />
    </div>
  );
};

export default Pahar;
