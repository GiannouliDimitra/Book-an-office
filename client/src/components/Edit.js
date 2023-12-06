import React from 'react';
import { useState , useEffect } from 'react';
import { storage } from "./firebase";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-brown.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import { setKey, setLanguage, geocode, RequestType } from "react-geocode";
import Swal from 'sweetalert2';
import axios from "axios";
import './edit.css';

function Edit({ office, setIsEdit, getAllOffices }) {
   //states
   const [updatedValue, setUpdatedValue] = useState({
    location: office.location,
    place: office.place,
    photo: office.photo,
    price: office.price,
    availableDates: office.availableDates,
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [values, setValues] = useState([])

// Set Google Maps Geocoding API key for quota management
setKey("AIzaSyAq78hcX-oSEj5_dDPLuTTR_v4V7-6AHhY");
setLanguage("en"); 

  const handleInputChange = (e) =>  {
    setUpdatedValue({
      ...updatedValue,
      [e.target.name]: e.target.value,
    });
    console.log(updatedValue);
  };
  function handleInputPlaceChange(e) {
    getLocationByCity(e);
     console.log( "from input event handler" ,e.target.value)
     handleInputChange(e, "place");
 };

 function handleChange(e) {
   setValues(e);
   findAvailabledays(e);
 }

 function findAvailabledays(days) {
  console.log("you choose",  days)
  for(let i=0; i<days.length; i++) {
    setUpdatedValue({...updatedValue, availableDates:days})
    let date = new Date (office.availableDates[i])
    console.log("the date", date)
  }
};
  //upload the image with firebase
  const uploadImage = () => {
    if(imageUpload == null) {
      return
      } else {
          const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
          uploadBytes(imageRef, imageUpload).then(() => {
          getDownloadURL(imageRef).then((url) => {
          setUpdatedValue({...updatedValue, photo:url})
          }) 
      });
      Swal.fire({ text:"The image is uploaded.",
      confirmButtonColor:"#B45931ff"});
      
      }
  };

  
    // Get latitude & longitude from address.
    function getLocationByCity (city) {
      console.log("this is the city" , city.target.value)
      geocode(RequestType.ADDRESS, city.target.value)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        setUpdatedValue({...updatedValue, place:city.target.value, location: [lat, lng] })
        console.log(lat, lng, office.location);
      })
      .catch(console.error);
  };

const saveChanges = () => {
    try {
      axios
        .put(`http://localhost:8000/${office._id}`, {
          location: updatedValue.location,
          place: updatedValue.place,
          photo: updatedValue.photo,
          price: updatedValue.price,
          availableDates: updatedValue.availableDates,
        })
        .then((res) => console.log(res.data))
        .then(() => getAllOffices())
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
    setIsEdit(false);
    Swal.fire({ text:"The item is updated.",
    confirmButtonColor:"#B45931ff"});
  };


  return (
    <div className='editMainContainer'>
      <h2 className='editTextTitle'>Edit your office here:</h2>
      <input className='editInput'
        type="text"
        name="place"
        placeholder=" place..."
        onChange={(e) => handleInputPlaceChange(e, "place")}
        value={updatedValue.place}
      />
      <div className="editPhotoInputContainer">
               <input
              className='editInputPhoto'
              type="file"
              placeholder="Add a photo..."
              onChange={(e) => setImageUpload(e.target.files[0])}
              />
              <button  className='editUploadBut' onClick={uploadImage}>Upload</button>
          </div> 
      <input
        className='editInput'
        type="text"
        name="price"
        placeholder="price...."
        onChange={(e) => handleInputChange(e, "price")}
        value={updatedValue.price}
      />
     <DatePicker 
        className="custom-calendar bg-brown"
        inputClass="custom-input"
        multiple
        value={office.availableDates} 
        onChange={(e) => handleChange(e)}
        />
      <div className="buttonContainer">
        <button className="editButton" type="submit" onClick={saveChanges}>
            Update
        </button>
        <button className="editButton" onClick={() => setIsEdit(false)} >
 Cancel
        </button>
      </div>

    </div>
  );
}

export default Edit;