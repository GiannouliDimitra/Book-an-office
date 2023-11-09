//import the dependencies
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import the components
import Map from "./components/Map";
import OfficesList from './components/OfficesList';
import AddOffice from './components/AddOffice';


function App() {

  //states

  const [offices, setOffices] = useState([]);
  const [office, setOffice] = useState ({
    location: [],
    place: "",
    photo: "",
    price: null,
    isAvailable: true,
    availableDates: [],
  })

  function getAllOffices(){
    try {
      axios
      .get("http://localhost:8000/offices")
      .then((res) => {
      setOffices(res.data);
        console.log (`getAllOffices`, offices)
      })
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllOffices();
  }, []);

  return (
    <div className="App">
     <h1>hi</h1>
     <OfficesList
      office = {office}
      offices = {offices}
      getAllOffices = {getAllOffices}
     /> 
     <AddOffice
     office ={office}
     setOffice={setOffice}
     getAllOffices = {getAllOffices}
     />
  {/*    <Map/> */}
    </div>
  );
}

export default App;
