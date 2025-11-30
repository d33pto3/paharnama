import React from "react";

type Props = {
  children: React.ReactElement;
};

const Navbar = (props: Props) => {
  return (
    <>
      <div className="absolute w-full z-1 backdrop-blur-lg px-16 py-2">
        <div>
          <img src="/images/icon/mountain.svg" className="h-14 w-14 invert" />
        </div>
      </div>

      {props.children}
    </>
  );
};

export default Navbar;
