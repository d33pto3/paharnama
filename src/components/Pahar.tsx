import { useRef, useEffect, useState, useMemo } from "react";
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
  const isTransitioning = useRef(false);

  const [mountains, setMountains] = useState<Mountain[] | []>([]);
  const [selectedMountain, setSelectedMountain] = useState<Mountain | null>(
    null
  );
  const [isContentLeaving, setIsContentLeaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: false,
      speed: 1500,
      beforeChange: (oldIndex: number, newIndex: number) => {
        if (oldIndex !== newIndex) {
          isTransitioning.current = true;
        }
      },
      afterChange: (currentIndex: number) => {
        setSelectedMountain(mountains[currentIndex]);
        setIsContentLeaving(false);
        isTransitioning.current = false;
      },
    }),
    [mountains]
  );

  useEffect(() => {
    let rafId: number;

    const attachListeners = () => {
      const sliderEl = sliderRef.current?.innerSlider?.list;
      if (!sliderEl) {
        rafId = requestAnimationFrame(attachListeners);
        return;
      }

      const handleInitiation = () => {
        if (!isTransitioning.current) {
          setIsContentLeaving(true);
        }
      };

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        handleInitiation();

        if (isTransitioning.current) return;

        if (e.deltaY > 0) {
          sliderRef.current?.slickNext();
        } else if (e.deltaY < 0) {
          sliderRef.current?.slickPrev();
        }
      };

      sliderEl.addEventListener("wheel", onWheel, { passive: false });

      return () => {
        sliderEl.removeEventListener("wheel", onWheel);
      };
    };

    rafId = requestAnimationFrame(attachListeners);
    return () => cancelAnimationFrame(rafId);
  }, [mountains]); // Re-attach if mountains load and slider rebuilds

  useEffect(() => {
    const getMountains = async () => {
      try {
        const res = await axios.get(
          "https://paharnama-backend.onrender.com/api/mountains"
        );
        if (res.data && res.data.length > 0) {
          setMountains(res.data);
          setSelectedMountain(res.data[0]);
          setIsError(false);
        } else {
          setIsError(true);
        }
      } catch (err) {
        console.error("Failed to fetch mountains:", err);
        setIsError(true);
      }
    };

    getMountains();
  }, []);

  if (isError || mountains.length === 0) {
    return (
      <div className="h-screen w-screen relative overflow-hidden flex items-center justify-center bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')`,
            filter: "brightness(0.4)",
          }}
        />
        <div className="relative z-10 text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Peak Silence
          </h2>
          <p className="text-lg md:text-xl text-white/60 font-medium tracking-widest uppercase animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-300">
            Server is currently resting. Please try again later.
          </p>
          <div className="mt-8 opacity-20 animate-pulse">
            <img
              src="/images/icon/mountain.svg"
              className="w-16 h-16 mx-auto invert"
              alt="mountain icon"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div className="h-full w-full relative">
        <Slider ref={sliderRef} {...settings} className="h-screen pahar-slider">
          {mountains?.map((mountain: Mountain) => (
            <div
              key={mountain.key}
              className="relative w-screen h-screen"
              onMouseMove={(e) => {
                setMousePos({ x: e.clientX, y: e.clientY });
                setShowTooltip(true);
              }}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <div
                className="w-full h-full bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${mountain.mountain_img})` }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDrawer();
                }}
              />
            </div>
          ))}
        </Slider>

        <div
          className={`absolute top-0 bottom-0 right-0 pointer-events-none transition-all duration-300 ${
            drawerOpen
              ? "left-0 sm:left-[70vw] md:left-[380px] lg:left-[440px] xl:left-[500px]"
              : "left-0"
          }`}
        >
          <Title
            key={selectedMountain?.key}
            title={selectedMountain?.key}
            isLeaving={isContentLeaving}
          />
        </div>

        {showTooltip && !drawerOpen && (
          <div
            className="fixed pointer-events-none z-50 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-medium tracking-[0.2em] uppercase transition-opacity duration-300 shadow-xl flex items-center gap-2"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y + 20,
              transform: "translate(0, 0)",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            click to see info
          </div>
        )}
      </div>

      <Drawer
        mountain={selectedMountain}
        isOpen={drawerOpen}
        isLeaving={isContentLeaving}
        closeDrawer={toggleDrawer}
      />
    </div>
  );
};

export default Pahar;
