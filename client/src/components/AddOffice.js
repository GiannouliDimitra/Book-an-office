//import the depedencies
import axios from "axios";
import { useEffect, useState } from 'react';
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


function AddOffice ( { getAllOffices, office, setOffice }) {
//states
const [availability, setAvailability] = useState([]);

// Set Google Maps Geocoding API key for quota management
  setKey("AIzaSyBb_zLTWnICoLTDa-bnlYDh5nW5rKky7bc");
  setLanguage("en"); // Default language for responses.


  // Get latitude & longitude from address.
  function getLocationByCity (city) {
    console.log("this is the city" , city)
     geocode(RequestType.ADDRESS, city) //here is the problem
    .then(({ results }) => {
      const { lat, lng } = results[0].geometry.location;
      console.log(lat, lng);
      console.log (results)
    })
  /*   .then(setOffice({...office, location: [lat, lng] })) */
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
   /*  getLocationByCity(e) */
  };

//axios post
  const addOffice = () => {
    try {
      axios
          .post("http://localhost:8000/create", office)
          .then((res) => {
            alert("The office " + res.data.createdOffice.place + " is added.")
           
          })
          .then(() => getAllOffices())
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
        console.log("from addform" , days)
      }
    }
  return ( 
    <div className ="inputField">
      <div>
      <button onClick={getLocation}>Get your location</button>
      </div>
      <input
        type="text"
        placeholder="Add a place..."
        onChange={(e) => handleInputPlaceChange(e)}
      />
        <input
        type="text"
        placeholder="Add a photo..."
        onChange={(e) => handleInputChange(e, "photo")}
      />
        <input
        type="number"
        placeholder="Add a price..."
        onChange={(e) => handleInputChange(e, "price")}
      />
    <Calendar
    findAvailabledays ={findAvailabledays} />
      <button type="submit" className="addBut" onClick={addOffice}>
      <i className="material-icons addIcon">add_box</i>
      </button>
    </div>
  
   );
}

export default AddOffice;

