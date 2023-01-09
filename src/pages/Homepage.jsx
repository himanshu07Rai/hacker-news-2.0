import { useState, useEffect } from "react";
import Top10 from "../components/Top10";
import Top20 from "../components/Top20";
import Top50 from "../components/Top50";
import All from "../components/All";
const options = [
  { label: "all", value: 100 },

  { label: "top 10", value: 10 },

  { label: "top 20", value: 20 },

  { label: "top 50", value: 50 },
];

const Homepage = () => {
  const [value, setValue] = useState(100);

  // console.log(data);

  return (
    <>
      <label>
        <select value={value} onChange={(e) => setValue(e.target.value)}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>

      <p>We eat {value}!</p>
      {value == 10 ? (
        <Top10 />
      ) : value == 20 ? (
        <Top20 />
      ) : value == 50 ? (
        <Top50 />
      ) : (
        <All />
      )}
    </>
  );
};

export default Homepage;
