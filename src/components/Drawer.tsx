import React, { useState } from "react";
import { X } from "./animate-ui/icons/x";
import { AnimateIcon } from "./animate-ui/icons/icon";

export type Mountain = {
  name: string;
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
  closeDrawer: () => void;
};

const Drawer = ({ mountain, isOpen, closeDrawer }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-xl transform transition-transform duration-300 z-50 w-[85vw] sm:w-[70vw] md:w-[380px] lg:w-[440px] xl:w-[500px] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <button onClick={closeDrawer} className="mb-4 flex justify-end">
            <AnimateIcon className="cursor-pointer" animateOnHover>
              <X />
            </AnimateIcon>
          </button>

          {mountain && (
            <div className="flex flex-col gap-4 ">
              <div className="flex gap-2 items-center text-center">
                <h2 className="text-3xl font-bold">{mountain.name}</h2>
                <div className="relative">
                  {showTooltip && (
                    <p className="absolute left-6 text-nowrap text-xs text-gray-500 border px-2 rounded-xs bg-red-100">
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
                    >
                      ⚠️
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <img src={mountain.country_flag_img} className="w-10 h-6" />
                <p className="text">{mountain.translations[0].location}</p>
              </div>

              <p className="text-gray-600 text-sm">
                {mountain.translations[0].description}
              </p>

              <div>
                <p>First Climber: {mountain.translations[0].first_climber}</p>
                {mountain.translations[0].first_climber &&
                  mountain.first_climbed_date && (
                    <p className="text-gray-700 text-sm">
                      Climbed in{" "}
                      {new Date(
                        mountain.first_climbed_date
                      ).toLocaleDateString()}
                    </p>
                  )}
              </div>

              <div className="flex items-end gap-2">
                <p className="text-xl">⛰️</p>
                <span>${mountain.altitude}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Drawer;
