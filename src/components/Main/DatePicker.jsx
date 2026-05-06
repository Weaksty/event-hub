import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DatePicker.css';

const Example = ({date, setDate}) => {
  return (
    <DatePicker
      selected={date}
      onChange={(d) => setDate(d)}
      dateFormat="yyyy-MM-dd"
      className="myInput"
      placeholderText="From"
      isClearable
    />
  );
};

export default Example;
