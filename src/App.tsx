import { useState } from "react";
import "./App.css";
import FollowCursor from "./components/FollowCursor";
import Navbar from "./components/Navbar";
import Pahar from "./components/Pahar";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <>
      <Navbar>
        <Pahar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      </Navbar>
      <FollowCursor />
    </>
  );
}

export default App;
