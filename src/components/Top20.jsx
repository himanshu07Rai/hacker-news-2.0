import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "@chakra-ui/react";

import { createURLDate, dateOffset } from "../utils/date";
import Card from "./Card";

var myDate = new Date(2023, 0, 7);

const fetchData = async (setData, data, setError) => {
  try {
    const res = await axios.get(`/api/data/${createURLDate(myDate)}.js`, {
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
    // console.log(myDate);
    await t.forEach((element) => {
      element.created_at = myDate;
    });

    t.sort((a, b) => (a.points < b.points ? 1 : -1));
    // const d = t.filter((d) => d);
    t.length = 20;
    setData([...data, ...t]);
    myDate.setTime(myDate.getTime() - dateOffset);
  } catch (error) {
    setError(error);
  }
};
const Top20 = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchData(setData, data, setError);
    setIsLoading(false);
  }, []);

  console.log(data);

  return isLoading ? (
    <Spinner />
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
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {data.map((d, index) => {
            return (
              <div key={index}>
                <Card
                  url={d.link}
                  title={d.link_text}
                  source={d.source}
                  comments={d.comments}
                  points={d.points}
                  created_at={d.created_at}
                  author={d.submitter}
                />
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Top20;
