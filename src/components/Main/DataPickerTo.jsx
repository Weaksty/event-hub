import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DatePicker.css';

const ExampleTo = ({dateTo, setDateTo}) => {
  return (
    <DatePicker
      selected={dateTo}
      onChange={(d) => setDateTo(d)}
      dateFormat="yyyy-MM-dd"
      placeholderText="To"
      className="myInput"
      isClearable
    />
  );
};

export default ExampleTo
