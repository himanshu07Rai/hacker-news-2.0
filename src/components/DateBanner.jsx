import { Text } from "@chakra-ui/react";
import { format } from "date-fns";

const DateBanner = ({ date }) => {
  return (
    <div
      style={{
        "box-shadow":
          " rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
        height: "50px",
        padding: "10px",
        backgroundColor: "#f36a6a",
        borderRadius: "5px",
      }}
    >
      <Text fontSize={"larger"} fontWeight="bold" textColor={"#ffd9d9"}>
        {format(new Date(date), "dd MMM yyyy")}
      </Text>
    </div>
  );
};

export default DateBanner;
