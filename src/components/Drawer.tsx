import React from "react";
import { X } from "./animate-ui/icons/x";
import { AnimateIcon } from "./animate-ui/icons/icon";

type Mountain = {
  mountain_img: string;
  name: string;
  description: string;
};

type Props = {
  mountain: Mountain | null;
  isOpen: boolean;
  closeDrawer: () => void;
};

const Drawer = ({ mountain, isOpen, closeDrawer }: Props) => {
  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
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
            <>
              <h2 className="text-2xl font-bold mb-2">{mountain.name}</h2>
              <p className="text-gray-600">{mountain.description}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Drawer;
