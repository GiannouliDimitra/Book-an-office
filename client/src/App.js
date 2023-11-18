//import the dependencies
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import the components
import Map from "./components/Map";
import OfficesList from './components/OfficesList';
import AddOffice from './components/AddOffice';
import NavBar from './components/NavBar';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Home from './components/Home';

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
    <BrowserRouter>
    <NavBar />
    <Routes>
    <Route
          path="/addForm"
          element={<AddOffice
            office ={office}
            setOffice={setOffice}
            getAllOffices = {getAllOffices}
            />}
        />
        <Route
          path="/offices"
          element={ <>
        <OfficesList
            office = {office}
            offices = {offices}
            getAllOffices = {getAllOffices}
           /> {/* <Map/> */}   </>}
        />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
