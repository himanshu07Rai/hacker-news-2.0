import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

let day = 7;

const fetchData = async (setData, data, setError) => {
  try {
    const res = await axios.get(`/api/data/2023010${day}.js`, {
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
    //   let x = t;
    //   x.sort((a, b) => b.points - a.points);
    setData([...data, ...t]);
    day = day - 1;
  } catch (error) {
    setError(error);
  }
};

const Homepage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const date = new Date(2023, 0, 1);
  console.log(date.getDate(), date.getMonth(), date.getFullYear());

  date.setDate(date.getDate() - 1);

  console.log(date.getDate(), date.getMonth(), date.getFullYear());

  console.log(date);

  useEffect(() => {
    setIsLoading(true);
    fetchData(setData, data, setError);
    setIsLoading(false);
  }, []);

  console.log(error);

  console.log(data);

  return isLoading ? (
    <h1>Loading</h1>
  ) : error ? (
    <h1>{error.message}</h1>
  ) : (
    <>
      <div>
        <InfiniteScroll
          dataLength={data.length}
          next={() => {
            fetchData(setData, data, setError);
          }}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {data.map((d) => {
            return (
              <div key={d.id}>
                {console.log(d.id)}
                <a href={d.link}>{d.link_text}</a>
                <p>{d.points}</p>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Homepage;
