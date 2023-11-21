//import the depedencies
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
import 'material-icons/iconfont/material-icons.css';
import Calendar from "./Calendar";
import ("./addOffice.css");

function AddOffice ( { getAllOffices, office, setOffice }) {

//variables
let token = localStorage.getItem("token");
const navigate = useNavigate();

// Set Google Maps Geocoding API key for quota management
  setKey("AIzaSyBb_zLTWnICoLTDa-bnlYDh5nW5rKky7bc");
  setLanguage("en"); // Default language for responses.


  // Get latitude & longitude from address.
  function getLocationByCity (city) {
    console.log("this is the city" , city.target.value)
    geocode(RequestType.ADDRESS, city.target.value)
    .then(({ results }) => {
      const { lat, lng } = results[0].geometry.location;
      setOffice({...office, location: [lat, lng ] })
      console.log(lat, lng, office.location);
    })
    .catch(console.error);
}
 
//handleInputs
  function handleInputChange(e, fieldName) {
    setOffice({
      ...office,
      [fieldName]: e.target.value,
    });
  };

  function handleInputPlaceChange(e) {
    handleInputChange(e, "place");
    getLocationByCity(e)
  };

//axios post
  const addOffice = () => {
    try {
      axios
          .post("http://localhost:8000/create", office, { headers:{ Authorization: `Bearer ${token}`} })
          .then((res) => {
            alert("The office " + res.data.createdOffice.place + " is added.")
          })
          .then(() => {
            getAllOffices()
            navigate('/offices')
          })
          .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };


  //location
function getLocation(){
  console.log("this is the coors works")
  let lat;
  let lng;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude.toFixed(2);
        lng = position.coords.longitude.toFixed(2);
       setOffice( {...office, location: [lat, lng] });
        });
      } else {
        alert = "Geolocation is not supported by this browser.";
      }
    };

    //availability

    function findAvailabledays(days) {
      console.log(days)
      for(let i=0; i<days.length; i++) {
        setOffice({...office, availableDates:days})
        let date = new Date (office.availableDates[i])
        console.log("the date", date)
      }
    }
  return ( 
    <> 
    
    <div className="addFormMainContainer">
        <div className ="inputField">
        <h1 className='addFormText'>Add a new office</h1>
        <div className='addFormInput placeInput'>
           <input
           className='placeFormInput'
            type="text"
            placeholder="Add a place..."
            onChange={(e) => handleInputPlaceChange(e)}
          />
          <button className="geolocationBut" title="Add your location" onClick={getLocation}><i className="material-icons radarIcon">radar</i></button>
        </div>
         
          <div>
          
          </div>
            <input
            className='addFormInput'
            type="text"
            placeholder="Add a photo..."
            onChange={(e) => handleInputChange(e, "photo")}
          />
            <input
            className='addFormInput'
            type="number"
            placeholder="Add a price..."
            onChange={(e) => handleInputChange(e, "price")}
          />
        <Calendar
        findAvailabledays ={findAvailabledays} 
        />
          <button type="submit" className="addBut" onClick={addOffice}>
        Add IT!
          </button>
    </div>
    </div>
    <Footer/>
    </>
   );
}

export default AddOffice;

