import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import ("./calendar.css")
export default function Calendar( { findAvailabledays }) {

  const today = new Date()
  const tomorrow = new Date()
  
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [values, setValues] = useState([])
  function handleChange(e) {
    setValues(e);
    findAvailabledays(e);
  }
  
  return (
    <DatePicker 
      placeholder="Add the date"
      className="custom-calendar"
      inputClass="custom-input"
      multiple
      value={values} 
      onChange={ (e) => handleChange(e)}
    />
  )
};