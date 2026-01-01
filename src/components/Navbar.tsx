import React from "react";

type Props = {
  children: React.ReactElement;
  drawerOpen: boolean;
};

const Navbar = ({ children, drawerOpen }: Props) => {
  return (
    <>
      <div
        className={`fixed top-0 z-1 backdrop-blur-lg px-16 py-2 transition-all duration-300 right-0 ${
          drawerOpen
            ? "left-[85vw] sm:left-[70vw] md:left-[380px] lg:left-[440px] xl:left-[500px]"
            : "left-0"
        }`}
      >
        <div>
          <img src="/images/icon/mountain.svg" className="h-14 w-14 invert" />
        </div>
      </div>
      {children}
    </>
  );
};

export default Navbar;
