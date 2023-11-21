import axios from "axios";
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode"; 
import DatePicker from "react-multi-date-picker";
import Edit from './Edit';

import "./officeItem.css";

function OfficeItem ( { office, offices, getAllOffices, setOffice }) {

  //states
  const [id, setId] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [bookPressed, setBookPressed] = useState (false);
  const [ownerOfficesIds, setOwnerOfficesIds] = useState ([]);
  const [values, setValues] = useState([]);
  const [reservation, setReservation] = useState ({
    dates: [],
    officePlace:"",
    userId: "",
    ownerId: "",
    officeId: "",
  });
  //variables for the token
  let token = localStorage.getItem("token");
  let decoded = jwtDecode(token);


  function filter () {
    let ownerOfficesIds = offices
    .filter( (office) => office.owner._id === decoded.id)
    .map( (office) => office._id);
    setOwnerOfficesIds(ownerOfficesIds);
  
  }

  useEffect(( )=> {filter()} , [decoded.id]);


  async function deleteOffice(id) {
    const result = window.confirm("Are you sure you want to delete it?");
    if(result){
      try {
        await axios.delete(`http://localhost:8000/${id}`);
        getAllOffices();
      } catch (error) {
        console.log("delete product", error);
      }
    }
  };
// open the edit field of the office
  async function editOffice(id) {
    setId(id);
    setIsEdit(true);
  };

  function findAvailabledays(days) {
   let pickedDate = reservation.dates.filter((date) => !days.includes(date))
    console.log("you choose", reservation.dates, days, pickedDate)
     for(let i=0; i<days.length; i++) { 
      setOffice({...reservation, dates:days}) 
  
    }
  }

  async function handleBookPressed(id) {
    setBookPressed(true);
  };


  function handleBookInputChange(e) {
    setValues(e);
    console.log("from book input" ,e)
    findAvailabledays(e);
    setReservation({
      ...reservation,
      dates: values,
      officePlace: office.place,
      userId: decoded.id,
      ownerId: office.owner,
      officeId: office._id,
    });
  };

 
  //axios post
  const  addReservation = ( ) => {
    try {
      axios
          .post("http://localhost:8000/reservation", reservation )
          .then((res) => {
            alert("The reservation " + res.data.createdReservation._id + " is added.")
           
          })
          .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

    return ( 
      <div>
        { !bookPressed ? (
          <>
   <div className="ItemContainer">
   <img className="itemImage item" src={office.photo}/>
   <h3 className="item">{office.place}</h3>
   <span className="item">{office.location}</span>
   <h4 className="item">{office.price} euro/day</h4>
   <h4 className="item">{office.owner.name} is the owner</h4>
   { token && ownerOfficesIds.includes(office._id) ? (
     <div className="itemButtons">
     <button className="item" onClick={() =>deleteOffice(office._id)}>DELETE</button>
     <button className="item" onClick={() =>editOffice(office._id)}>UPDATE</button>
     </div>
   ) : (
     <div className="itemButtons">
     <button className="item" onClick={() => handleBookPressed(office._id, office.place, office.owner)}>BOOK IT</button>
     </div> 
   )}
 </div>
 {isEdit && <Edit
 office = {office}
 setIsEdit = {setIsEdit}
 getAllOffices = {getAllOffices}
 />
 }
 </>
        ) : (
          <div>
            <img className="itemImage item" src={office.photo}/>
            <h3 className="item">{office.place}</h3>
            <span className="item">{office.location}</span>
            <h4 className="item">Cost: {office.price} euro/day</h4>
            <h4 className="item">Owners info: {office.owner.email}</h4>
            <h4 className="item">{office.availableDates}</h4>
            <DatePicker 
              multiple
              value={office.availableDates} 
              onChange={(e) => handleBookInputChange(e)}
            />
            <button className="item" onClick={addReservation}>Book the office</button>
             <button className="item" onClick={() => setBookPressed(false)}>Cancel</button>
          </div>
        )}
     
      </div>
        
     );
}

export default OfficeItem ;