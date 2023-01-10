import {
  Box,
  Button,
  ButtonGroup,
  Card as _Card,
  CardBody,
  Text,
} from "@chakra-ui/react";

import { format } from "date-fns";
import { ChatIcon, CheckIcon } from "@chakra-ui/icons";

const Card = ({ url, title, source, comments, points, created_at, author }) => {
  return (
    <_Card
      margin={"20px"}
      borderLeft="10px solid #f36a6a"
      backgroundColor={"#dddef7"}
    >
      <CardBody>
        <Text fontSize={{ base: "18px", md: "26px", lg: "30px" }}>
          <a href={url} target="_blank">
            {title}
          </a>
        </Text>
        <Text padding={"10px"}>
          Source :<span> {source}</span>
        </Text>

        <ButtonGroup spacing="2" display={"flex"}>
          <Button cursor={"default"} variant="solid" colorScheme="blue">
            <ChatIcon marginRight={"10px"} />
            {comments}
          </Button>
          <Button cursor={"default"} variant="solid" colorScheme="blue">
            <CheckIcon marginRight={"10px"} />
            {points}
          </Button>
          <Button variant="ghost" colorScheme="blue">
            {format(new Date(created_at), "dd MMM yyyy")}
          </Button>
        </ButtonGroup>
        <Text padding={"0 0 10px 10px"} textAlign={"right"}>
          By : {author}
        </Text>
      </CardBody>
    </_Card>
  );
};

export default Card;
