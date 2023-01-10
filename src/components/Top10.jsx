import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ChatIcon, CheckIcon } from "@chakra-ui/icons";

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
    // console.log(myDate);
    await t.forEach((element) => {
      element.created_at = myDate;
    });

    t.sort((a, b) => (a.points < b.points ? 1 : -1));
    // const d = t.filter((d) => d);
    t.length = 10;
    setData([...data, ...t]);
    myDate.setTime(myDate.getTime() - dateOffset);
  } catch (error) {
    setError(error);
  }
};
const Top10 = () => {
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
    <Spinner />
  ) : error ? (
    <h1>{error.message}</h1>
  ) : (
    <>
      <div>
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
                <Card
                  margin={"20px"}
                  backdropBlur="2xl"
                  backgroundColor={"#dddef7"}
                >
                  <CardBody>
                    <Text fontSize={{ base: "18px", md: "26px", lg: "30px" }}>
                      <a href={d.link} target="_blank">
                        {d.link_text}
                      </a>
                    </Text>
                    <Text padding={"10px"}>
                      Source :<span> {d.source}</span>
                    </Text>

                    <ButtonGroup spacing="2" display={"flex"}>
                      <Button
                        cursor={"default"}
                        variant="solid"
                        colorScheme="blue"
                      >
                        <ChatIcon marginRight={"10px"} />
                        {d.comments}
                      </Button>
                      <Button
                        cursor={"default"}
                        variant="solid"
                        colorScheme="blue"
                      >
                        <CheckIcon marginRight={"10px"} />
                        {d.points}
                      </Button>
                      <Button variant="ghost" colorScheme="blue">
                        {format(new Date(d.created_at), "dd MMM yyyy")}
                      </Button>
                    </ButtonGroup>
                    <Text padding={"0 0 10px 10px"} textAlign={"right"}>
                      By : {d.submitter}
                    </Text>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Top10;
