//import the depedencies
import axios from "axios";
import { useEffect, useState } from 'react';
import 'material-icons/iconfont/material-icons.css';
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


function AddOffice ( { getAllOffices, office, setOffice }) {


// Set Google Maps Geocoding API key for quota management
  setKey("AIzaSyBb_zLTWnICoLTDa-bnlYDh5nW5rKky7bc");
  setLanguage("en"); // Default language for responses.


  // Get latitude & longitude from address.
  geocode(RequestType.ADDRESS, "Athens")
  .then(({ results }) => {
    const { lat, lng } = results[0].geometry.location;
    console.log(lat, lng);
    console.log (results)
  })
  .catch(console.error);



  function handleInputChange(e, fieldName) {
    setOffice({
      ...office,
      [fieldName]: e.target.value,
    });
  };

  const addOffice = () => {
    try {
      axios
          .post("http://localhost:8000/create", office)
          .then((res) => {
            alert("The office " + res.data.createdOffice.name + " is added.")
           
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
  let currentLat;
  let currentLong;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
        currentLat = position.coords.latitude.toFixed(2);
        currentLong = position.coords.longitude.toFixed(2);
       console.log (currentLat, currentLong)
       setOffice({...office, location: [currentLat, currentLong] });
        });
      } else {
        alert = "Geolocation is not supported by this browser.";
      }
    };
  return ( 
    <div className ="inputField">
      <div>
       {/*   <input
        type="text"
        placeholder="Type a location..."
        onChange={}
      /> */}
      <button onClick={getLocation}>Get your location</button>
      </div>
      <input
        type="text"
        placeholder="Add a name..."
        onChange={(e) => handleInputChange(e, "name")}
      />
        <input
        type="text"
        placeholder="Add a photo..."
        onChange={(e) => handleInputChange(e, "photo")}
      />
        <input
        type="number"
        placeholder="Add a price..."
        onChange={(e) => handleInputChange(e, "number")}
      />
    
      <button type="submit" className="addBut" onClick={addOffice}>
      <i className="material-icons addIcon">add_box</i>
      </button>
    </div>
  
   );
}

export default AddOffice;

