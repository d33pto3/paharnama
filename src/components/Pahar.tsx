import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Drawer, { type Mountain } from "./Drawer";
import Title from "./pahar/Title";

const mountains: Mountain[] = [
  {
    mountain_img: "/images/1.jpg",
    name: "Himalay",
    altitude: "8,848.86 m (29,031.7 ft)",
    has_death_zone: true,
    first_climbed_date: "1953-05-28T18:00:00.000Z",
    country_flag_img:
      "data:image/png;base64,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",
    translations: [
      {
        description:
          "Mount Everest, standing majestically as the Earth's highest peak at an awe-inspiring elevation of 29,032 feet (8,848 meters) above sea level, resides in the heart of the Himalayas, straddling the border between Nepal and Tibet. Its imposing summit is crowned with snow and ice, a testament to the formidable challenges posed by the harsh alpine conditions. Revered as the pinnacle of mountaineering ambition, Everest attracts adventurers from across the globe, each yearning to conquer its formidable slopes and reach the \"roof of the world.\" The journey to its summit is a grueling test of physical and mental endurance, navigating treacherous icefalls, crevasses, and unpredictable weather. Everest, known locally as Sagarmatha in Nepal and Chomolungma in Tibet, carries a mystique that transcends its physical grandeur, embodying the human spirit's relentless pursuit of heights both literal and metaphorical.",
        location: "China/Nepal",
        language: "en",
        first_climber: "first one",
      },
    ],
  },
  {
    mountain_img: "/images/2.jpg",
    name: "Keokradong",
    altitude: "8,848.86 m (29,031.7 ft)",
    has_death_zone: true,
    first_climbed_date: "1953-05-28T18:00:00.000Z",
    translations: [
      {
        language: "en",
        description: "bacbac",
        location: "Dhaka",
        first_climber: "uno",
      },
    ],
  },
  {
    mountain_img: "/images/3.jpg",
    name: "dac",
    altitude: "8,848.86 m (29,031.7 ft)",
    has_death_zone: true,
    first_climbed_date: "1953-05-28T18:00:00.000Z",
    translations: [
      {
        language: "en",
        description: "tokatok",
        location: "Dhaka",
        first_climber: "ek",
      },
    ],
  },
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
