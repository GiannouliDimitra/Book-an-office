import axios from "axios";
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode"; 
import DatePicker from "react-multi-date-picker";
import Swal from 'sweetalert2';
import 'material-icons/iconfont/material-icons.css'
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#49be25",
      cancelButtonColor: "#be4d25",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) { 
        try {
          axios.delete(`http://localhost:8000/${id}`)
          .then(() => {
             getAllOffices();
          })
         
        } catch (error) {
          console.log("delete product", error);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
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
          setBookPressed(false)
    } catch (error) {
      console.log(error);
    }
  };

    return ( 
      <div>
        { !bookPressed ? (
          <>
            <div className="ItemContainer">
               <div className="imageContainer">
                <img className="itemImage item" src={office.photo}/>
              </div>
              <div className="infoOfficeContainer">
                <h3 className="item placeItem">{office.place}</h3>
                <h6 className="item">It costs {office.price} euro/day</h6>
                <h4 className="item ownerOfTheOffice">{office.owner.name} 
                  <span className="spanIsTheOwner"> is the owner</span></h4>
              </div>
   

        { token && ownerOfficesIds.includes(office._id) ? (
          <div className="ownerItemButtons">
            <button className="deleteButItem" title="delete the item" onClick={() =>deleteOffice(office._id)}><i className="material-icons delete_foreverIcon">delete_forever</i></button>
            <button className="editButItem" title = "edit the item"onClick={() =>editOffice(office._id)}><i className="material-icons editIcon">edit</i></button>
          </div>
          ) : (
          <div className="bookItemButtons">
            <button className="bookButItem" onClick={() => handleBookPressed(office._id, office.place, office.owner)}>BOOK IT</button>
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
          <div className="bookMainContainer">
            <img className="itemImage item" src={office.photo}/>
            <h3 className="item">{office.place}</h3>
            <h4 className="item">Cost: {office.price} euro/day</h4>
            <h4 className="item">Owners info: {office.owner.email}</h4>
            <h4 className="item">The available dates are: {(office.availableDates).map((date) => (
              (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'})
              .format(date)) + " " ) )} </h4>
            <DatePicker 
              multiple
              value={office.availableDates} 
              onChange={(e) => handleBookInputChange(e)}
            />
            <div className="bookButtons">
            <button className="item bookBut" onClick={addReservation}>Book the office</button>
             <button className="item bookButCancel" onClick={() => setBookPressed(false)}>Cancel</button>
             </div>
          </div>
        )}
     
      </div>
        
     );
}

export default OfficeItem ;

