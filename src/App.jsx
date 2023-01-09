import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";

const Home = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      {" "}
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Link to="/news">News</Link>
    </div>
  );
};

const News = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [commentsCount, setCommentsCount] = useState(0);

  const baseURL = "https://hckrnews.com/";

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/data/20230106.js`, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "same-origin",
      });
      const t = res.data;
      setData(t);
    };

    fetchData();
  }, [search]);

  const getCommentsCount = async (id) => {
    const comments = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );

    console.log(comments);
    // return comments.data.descendants;
  };

  const onSearch = () => {
    setSearch(query);
  };

  const createDate = (d) => {
    const date = new Date(d);
    return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  };

  console.log(data);
  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      <div>
        {data.map((d) => {
          const date = createDate(d.created_at);
          console.log(date);
          const url = d.url ? d.url : "https://hckrnews.com/";
          const title = d.title ? d.title : "hckrnews.com";
          console.log(d.id);
          // getCommentsCount(d.id);
          return (
            <div key={d.created_at}>
              <a href={d.link}>{d.link_text}</a>
              <li>{date}</li>
            </div>
          );
        })}
      </div>
    </>
  );
};
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/news" element={<News />}></Route>
      </Routes>
    </div>
  );
}

export default App;
