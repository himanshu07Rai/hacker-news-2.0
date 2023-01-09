import { Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";

const _Routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/search" element={<Search />}></Route>
    </Routes>
  );
};

export default _Routes;
