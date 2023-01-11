import axios from "axios";

import { createURLDate, dateOffset, myDate } from "../utils/date";

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

    await t.forEach((element) => {
      element.created_at = myDate;
    });

    console.log(t);

    const obj = {
      [myDate.getTime()]: t,
    };

    // console.log(obj);

    setData([...data, { ...obj }]);

    myDate.setTime(myDate.getTime() - dateOffset);
  } catch (error) {
    setError(error);
  }
};

const fetchNews = async (query, setItems) => {
  const url = `https://hn.algolia.com/api/v1/search?query=${query}`;
  const res = await axios.get(url);
  let news = res.data.hits;
  setItems(news);
};

export { fetchData, fetchNews };
