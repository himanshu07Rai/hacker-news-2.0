import { Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Top from "./pages/Top";

const _Routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/top" element={<Top />}></Route>
    </Routes>
  );
};

export default _Routes;
