import { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
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
import { Link } from "react-router-dom";

const fetchNews = async (query, setLargeTitle, setItems) => {
  const url = `https://hn.algolia.com/api/v1/search?query=${query}`;
  const res = await axios.get(url);
  let news = res.data.hits;
  // news.length = 20;
  setItems(news);
};

export default function Search() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("development");
  const [text, setText] = useState("");
  const [largeTitle, setLargeTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchNews(query, setLargeTitle, setItems);
    setIsLoading(false);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      console.log("Input is empty");
    } else {
      setQuery(text);
      setText("");
      // console.log(text);
      // console.log(query);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {/* Search form */}
      <Link to="/">Home</Link>
      <form
        onSubmit={handleSubmit}
        className="flex place-items-center container mx-auto lg:max-w-4xl mt-10 px-5"
      >
        <Input
          width={{ base: "150px", md: "300px", lg: "500px" }}
          marginTop="10px"
          type="text"
          name="text"
          id="text"
          placeholder="eg. development"
          autoComplete="off"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full py-2 px-4 rounded bg-transparent border border-gray-700 focus:border-gray-600 transition-all duration-150 outline-none text-gray-700 placeholder-gray-700 text-xl lg:text-4xl lg:pb-4 mr-5"
        />
        <Button
          marginLeft="10px"
          variant="solid"
          colorScheme="blue"
          type="submit"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </form>
      {/* End of search form */}

      {items.map((item) => {
        const { author, created_at, objectID, title, url } = item;
        return (
          <div key={objectID}>
            <Card
              margin={"20px"}
              backdropBlur="2xl"
              backgroundColor={"#dddef7"}
            >
              <CardBody>
                <Text fontSize={{ base: "18px", md: "26px", lg: "30px" }}>
                  <a href={url} target="_blank">
                    {title}
                  </a>
                </Text>
              </CardBody>

              <CardFooter>
                <ButtonGroup spacing="2" display={"flex"}>
                  <Button variant="ghost" colorScheme="blue">
                    {format(new Date(created_at), "dd MMM yyyy")}
                  </Button>
                </ButtonGroup>
                <Divider />
              </CardFooter>
              <Divider height={"10px"} color="red" />
              <Text padding={"0 0 10px 10px"} textAlign={"left"}>
                By : {author}
              </Text>
            </Card>
          </div>
        );
      })}
    </>
  );
}
