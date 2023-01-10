import { useState, useEffect } from "react";
import Top10 from "../components/Top10";
import Top20 from "../components/Top20";
import Top50 from "../components/Top50";
import All from "../components/All";
import { Select } from "@chakra-ui/react";
const options = [
  { label: "All", value: "all" },

  { label: "Top 10", value: 10 },

  { label: "Top 20", value: 20 },

  { label: "Top 50", value: 50 },
];

const Homepage = () => {
  const [value, setValue] = useState(100);

  // console.log(data);

  return (
    <div style={{ backgroundColor: "#eee" }}>
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

      {value == 10 ? (
        <Top10 />
      ) : value == 20 ? (
        <Top20 />
      ) : value == 50 ? (
        <Top50 />
      ) : (
        <All />
      )}
    </div>
  );
};

export default Homepage;
