import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ChatIcon, CheckIcon } from "@chakra-ui/icons";

import { createURLDate, dateOffset } from "../utils/date";
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
    t.length = 50;
    setData([...data, ...t]);
    myDate.setTime(myDate.getTime() - dateOffset);
  } catch (error) {
    setError(error);
  }
};
const Top50 = () => {
  const [data, setData] = useState([]);
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
                  margin={"20px"}
                  borderLeft="10px solid #f36a6a"
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

export default Top50;
