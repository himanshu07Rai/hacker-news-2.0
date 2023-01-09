import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        {/* <Route path="/news" element={<News />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
