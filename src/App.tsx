import { useState } from "react";
import "./App.css";
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
    </>
  );
}

export default App;
