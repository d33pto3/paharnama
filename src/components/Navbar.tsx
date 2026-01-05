import React from "react";

type Props = {
  children: React.ReactElement;
};

const Navbar = ({ children }: Props) => {
  return (
    <>
      <div className="absolute top-0 w-full z-10 px-16 py-4">
        <div className="rounded-full w-18 h-18 flex items-center justify-center backdrop-blur-xs backdrop-saturate-250 bg-white/10 border border-white/50 shadow-lg shadow-black/5">
          <img src="/images/icon/mountain.svg" className="h-14 w-14 invert" />
        </div>
      </div>
      {children}
    </>
  );
};

export default Navbar;
