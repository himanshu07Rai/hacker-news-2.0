import { useState, useEffect } from "react";
import axios, { all } from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Select, Spinner } from "@chakra-ui/react";

import { createURLDate, dateOffset, myDate } from "../utils/date";
import Card from "./Card";
import DateBanner from "./DateBanner";

const filteredData = [];

const options = [
  { label: "All", value: "all" },

  { label: "Top 10", value: 10 },

  { label: "Top 20", value: 20 },

  { label: "Top 50", value: 50 },
];

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

    await t.forEach((element) => {
      element.created_at = myDate;
    });

    console.log(t);

    const obj = {
      [myDate.getTime()]: t,
    };

    console.log(obj);

    setData([...data, { ...obj }]);

    myDate.setTime(myDate.getTime() - dateOffset);
  } catch (error) {
    setError(error);
  }
};

const initialState = [];
const All = () => {
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(100);

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
        <Select
          backgroundColor={"#fff"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          margin={"30px auto"}
          height="40px"
          width={{ base: "150px", md: "300px", lg: "300px" }}
        >
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </Select>
        {/* {"fsfs"} */}
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
          {data.map((el, index) => {
            // const arr = el[Number(Object.keys(el)[0])];
            let arr = el[Number(Object.keys(el)[0])];
            arr.sort((a, b) => (a.points < b.points ? 1 : -1));
            arr =
              value == "all"
                ? arr
                : arr.slice(0, Number((arr.length * value) / 100));

            // console.log(arr);
            return (
              <>
                <DateBanner date={Number(Object.keys(el)[0])} />

                {arr.map((d, index) => {
                  // console.log(d);
                  return (
                    <div key={index}>
                      {/* <div>{"HI " + JSON.stringify(d)}</div> */}

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
              </>
            );
          })}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default All;
