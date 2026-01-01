import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "./animate-ui/icons/x";
import { AnimateIcon } from "./animate-ui/icons/icon";

export type Mountain = {
  key: string;
  altitude: string;
  mountain_img: string;
  country_flag_img?: string;
  has_death_zone: boolean;
  first_climbed_date?: string;
  translations: {
    language: string;
    description: string;
    location?: string;
    first_climber?: string;
  }[];
};

type Props = {
  mountain: Mountain | null;
  isOpen: boolean;
  isLeaving?: boolean;
  closeDrawer: () => void;
};

const Drawer = ({ mountain, isOpen, isLeaving = false, closeDrawer }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full backdrop-blur-xl backdrop-saturate-200 bg-white/60 border-r border-white/20 shadow-2xl transform transition-transform duration-300 z-50 w-full sm:w-[70vw] md:w-[380px] lg:w-[440px] xl:w-[500px] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <img src="/images/icon/mountain.svg" className="w-[80%] opacity-5" />
        </div>
        <div className="p-8 sm:p-6 flex flex-col h-full relative z-10 overflow-y-auto drawer-scroll">
          <button onClick={closeDrawer} className="mb-6 flex justify-end">
            <AnimateIcon className="cursor-pointer" animateOnHover>
              <X />
            </AnimateIcon>
          </button>

          <AnimatePresence mode="wait">
            {mountain && !isLeaving && (
              <motion.div
                key={mountain.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="flex flex-col gap-6"
              >
                {/* Title Section */}
                <div className="flex gap-3 items-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                    {mountain.key}
                  </h2>
                  <div className="relative">
                    {showTooltip && (
                      <p className="absolute left-8 top-1/2 -translate-y-1/2 text-nowrap text-xs text-gray-700 border border-red-200 px-3 py-1 rounded-md bg-red-50 shadow-sm">
                        Has Death Zone
                      </p>
                    )}
                    {mountain.has_death_zone && (
                      <button
                        onMouseEnter={() => {
                          setShowTooltip(true);
                        }}
                        onMouseLeave={() => {
                          setShowTooltip(false);
                        }}
                        className="text-lg sm:text-xl"
                      >
                        ⚠️
                      </button>
                    )}
                  </div>
                </div>

                {/* Location Section */}
                <div className="flex gap-3 items-center pb-6 border-b border-gray-200">
                  <img src={mountain.country_flag_img} className="w-8 h-5 sm:w-10 sm:h-6 object-cover rounded shadow-sm" />
                  <p className="text-sm sm:text-base text-gray-700 font-medium">
                    {mountain.translations[0].location}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {mountain.translations[0].description}
                </p>

                {/* First Climber Section */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      First Climber
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-900 font-medium">
                    {mountain.translations[0].first_climber || "Unknown"}
                  </p>
                  {mountain.translations[0].first_climber &&
                    mountain.first_climbed_date && (
                      <p className="text-xs sm:text-sm text-gray-500">
                        Climbed on{" "}
                        {new Date(
                          mountain.first_climbed_date
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                </div>

                {/* Altitude Section */}
                <div className="flex items-center gap-3 pt-4 mt-auto">
                  <p className="text-2xl sm:text-3xl">⛰️</p>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Altitude
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                      {mountain.altitude}m
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Drawer;
