import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "@chakra-ui/react";

let dateOffset = 24 * 60 * 60 * 1000; //1 days
var myDate = new Date(2023, 0, 7);

const monthMap = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const dayMap = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];

const createURLDate = () => {
  const day =
    myDate.getDate() < 10 ? dayMap[myDate.getDate()] : myDate.getDate();

  const month = monthMap[myDate.getMonth()];

  const year = myDate.getFullYear();

  return year + month + day;
};

// console.log(myDate);

// myDate.setTime(myDate.getTime() - dateOffset);

// console.log(myDate);

// console.log(myDate.getDate(), myDate.getMonth(), myDate.getFullYear());

const fetchData = async (setData, data, setError, value) => {
  try {
    const res = await axios.get(`/api/data/${createURLDate()}.js`, {
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
    t.length = 100;
    setData([...data, ...t]);
    myDate.setTime(myDate.getTime() - dateOffset);
  } catch (error) {
    setError(error);
  }
};

// const selectTop10 = (setTop10, setTop20, setTop50) => {
//   setTop20(false);
//   setTop50(false);
//   setTop10(true);
// };

// const selectTop20 = (setTop10, setTop20, setTop50) => {
//   setTop50(false);
//   setTop10(false);
//   setTop20(true);
// };

// const selectTop50 = (setTop10, setTop20, setTop50) => {
//   setTop10(false);
//   setTop20(false);
//   setTop50(true);
// };

// const selectData

const options = [
  { label: "all", value: 100 },

  { label: "top 10", value: 10 },

  { label: "top 20", value: 20 },

  { label: "top 50", value: 50 },
];

// const handleChange = (event, setValue) => {

// };

const All = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [value, setValue] = useState(100);

  useEffect(() => {
    setIsLoading(true);
    fetchData(setData, data, setError, value);
    setIsLoading(false);
  }, []);

  console.log(data);

  return isLoading ? (
    <h1>Loading</h1>
  ) : error ? (
    <h1>{error.message}</h1>
  ) : (
    <>
      <div>
        <h1 style={{ fontSize: "30px" }}>{createURLDate()}</h1>
        <InfiniteScroll
          dataLength={data.length}
          next={() => {
            fetchData(setData, data, setError, value);
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
                {/* {console.log(d.id)} */}
                if{}
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

export default All;
