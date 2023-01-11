import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";

const _Routes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </>
  );
};

export default _Routes;
