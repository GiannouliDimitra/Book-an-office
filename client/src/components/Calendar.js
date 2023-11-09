import { useState } from "react"
import DatePicker from "react-multi-date-picker"

export default function Calendar( { findAvailabledays }) {
  const today = new Date()
  const tomorrow = new Date()

  tomorrow.setDate(tomorrow.getDate() + 1)

  const [values, setValues] = useState([today, tomorrow])

  function handleChange(e) {
    setValues(e);
    findAvailabledays(e);
  }
  
  return (
    <DatePicker 
      multiple
      value={values} 
      onChange={ (e) => handleChange(e)}
    />
  )
}