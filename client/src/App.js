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
import Profil from './components/Profil';
import About from './components/About';
import Terms from './components/Terms';
import Contact from './components/Contact';
import StripeContainer from "./components/StripeContainer";
import ("./app.css");

function App() {

  //states

  const [offices, setOffices] = useState([]);
  const [office, setOffice] = useState ({
    location: [],
    place: "",
    photo: "",
    price: null,
    availableDates: [],
    reservationDates: [],
  });
 

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
          element={ 
        <OfficesList
            office = {office}
            offices = {offices}
            setOffice={setOffice}
            getAllOffices = {getAllOffices}
           /> 
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<StripeContainer/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<Profil 
         offices = {offices}/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
