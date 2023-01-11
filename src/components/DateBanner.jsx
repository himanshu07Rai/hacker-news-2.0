import { format } from "date-fns";

const DateBanner = ({ date }) => {
  return <h1>{format(new Date(date), "dd MMM yyyy")}</h1>;
};

export default DateBanner;
