import { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, Spinner, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { fetchNews } from "../utils/data";

export default function Search() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("development");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchNews(query, setItems);
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
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: "20",
          margin: "20px",
        }}
      >
        <Link to="/">🏠</Link>
      </div>
      <form style={{ marginTop: "15px" }} onSubmit={handleSubmit}>
        <Input
          width={{ base: "150px", md: "300px", lg: "500px" }}
          marginTop="10px"
          backgroundColor={"#ffe"}
          type="text"
          name="text"
          id="text"
          placeholder="eg. development"
          autoComplete="off"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
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

      {items.map((item) => {
        const { author, created_at, objectID, title, url } = item;
        return (
          <div key={objectID}>
            <Card
              margin={"20px"}
              backgroundColor={"#dddef7"}
              borderLeft="10px solid #f36a6a"
            >
              <CardBody>
                <Text fontSize={{ base: "18px", md: "26px", lg: "30px" }}>
                  <a href={url} target="_blank">
                    {title}
                  </a>
                </Text>
                <Text>{format(new Date(created_at), "dd MMM yyyy")}</Text>

                <Text padding={"0 0 10px 10px"} textAlign={"right"}>
                  By : {author}
                </Text>
              </CardBody>
            </Card>
          </div>
        );
      })}
    </>
  );
}
