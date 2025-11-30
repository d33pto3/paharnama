import "./App.css";
import FollowCursor from "./components/FollowCursor";
import Navbar from "./components/Navbar";
import Pahar from "./components/Pahar";

function App() {
  return (
    <>
      <Navbar>
        <Pahar />
      </Navbar>
      <FollowCursor />
    </>
  );
}

export default App;
