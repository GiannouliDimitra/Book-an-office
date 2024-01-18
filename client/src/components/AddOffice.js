//import the depedencies
import axios from "axios";
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import Swal from 'sweetalert2';
import Footer from "./Footer";
import { setKey, setLanguage, geocode, RequestType } from "react-geocode";
import 'material-icons/iconfont/material-icons.css';
import Calendar from "./Calendar";
import ("./addOffice.css");

function AddOffice ( { getAllOffices, office, offices, setOffice }) {

//states
const [imageUpload, setImageUpload] = useState(null);
//variables
let token = localStorage.getItem("token");
const navigate = useNavigate();

// Set Google Maps Geocoding API key for quota management
  setKey("AIzaSyAq78hcX-oSEj5_dDPLuTTR_v4V7-6AHhY");
  setLanguage("en"); 


  // Get latitude & longitude from address.
  function getLocationByCity (city) {
    console.log("this is the city" , city.target.value)
    geocode(RequestType.ADDRESS, city.target.value)
    .then(({ results }) => {
      const { lat, lng } = results[0].geometry.location;
      setOffice({...office, place:city.target.value, location: [lat, lng] })
      console.log(lat, lng, office.location);
    })
    .catch(console.error);
};
 
//handleInputs
  function handleInputChange(e, fieldName) {
    setOffice({
      ...office,
      [fieldName]: e.target.value,
    });

  };

    function handleInputPlaceChange(e) {
     getLocationByCity(e);
      console.log( "from input event handler" ,e.target.value)
      handleInputChange(e, "place");
  };

//axios post
  const addOffice = () => {
    uploadImage();
    console.log(office)
    try {
      axios
          .post("https://bookanoffice.onrender.com/create", office, { headers:{ Authorization: `Bearer ${token}`} })
          .then((res) => {
            Swal.fire({ text:"The office " + res.data.createdOffice.place + " is added.",
                        confirmButtonColor:"#B45931ff" })
          })
          .then(() => {
            getAllOffices()
          })
          .then(()=> {
            navigate('/offices')
          })
          .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

    //availability
    function findAvailabledays(days) {
      for(let i=0; i<days.length; i++) {
        setOffice({...office, availableDates:days})
        let date = new Date (office.availableDates[i])
        console.log("the date", date)
      }
    }

//upload the image with firebase
   const uploadImage = () => {
      if(imageUpload == null) {
        return
        } else {
            const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
            uploadBytes(imageRef, imageUpload).then(() =>{
            getDownloadURL(imageRef).then((url) => {
            setOffice({...office, photo:url})
            }) 
        });
      }
    }
  return ( 
    <div>    
      <div className="addFormMainContainer">
        <div className ="inputField">
          <h1 className='addFormText'>Add a new office</h1>
            <input
            className='placeFormInput'
            type="text"
            placeholder="Add a place..."
            onChange={(e) => handleInputPlaceChange(e, "place")}
            />
          <div className="photoInputContainer">
               <input
              className='addFiledInput'
              type="file"
              placeholder="Add a photo..."
              onChange={(e) => setImageUpload(e.target.files[0])}
              />

          </div>   
            <input
            className='addPriceInput'
            type="number"
            placeholder="Add a price..."
            onChange={(e) => handleInputChange(e, "price")}
             />
            <Calendar
            className="calendarAddForm"
            findAvailabledays ={findAvailabledays} 
            />
          <button type="submit" className="addBut" onClick={addOffice}>
           Add IT!
          </button>  
        </div>
    </div>
    <Footer/>
    </div>
   );
}

export default AddOffice;

