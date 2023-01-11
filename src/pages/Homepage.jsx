import { useState, useEffect } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Select, Spinner } from "@chakra-ui/react";

import Card from "../components/Card";
import DateBanner from "../components/DateBanner";
import { fetchData } from "../utils/data";

const options = [
  { label: "All", value: "all" },

  { label: "Top 10", value: 10 },

  { label: "Top 20", value: 20 },

  { label: "Top 50", value: 50 },
];

const initialState = [];
const Homepage = () => {
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
      <div style={{ backgroundColor: "#eee" }}>
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            zIndex: "20",
            margin: "20px",
            alignContent: "end",
          }}
        >
          <Link to="/search">
            <Search2Icon />
          </Link>
        </div>
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

export default Homepage;
