import { useState, useEffect } from "react";
import axios from "axios";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentsCount, setCommentsCount] = useState(0);

  const baseURL = "https://hckrnews.com/";

  useEffect(() => {
    fetchData();
  }, [search]);

  console.log(error);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/data/20230107.js`, {
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

      fetchData();
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const onSearch = () => {
    setSearch(query);
  };

  const createDate = (d) => {
    const date = new Date(d);
    return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  };

  console.log(data);

  return loading ? (
    <h1>Loading</h1>
  ) : error ? (
    <h1>{error.message}</h1>
  ) : (
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

export default Homepage;
