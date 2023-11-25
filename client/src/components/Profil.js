import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"; 
import axios from 'axios';
import Swal from 'sweetalert2';
import 'material-icons/iconfont/material-icons.css';
import "./profil.css";

function Profil ( { offices }) {

const [reservations, setReservations] = useState([]);

  //variables for the token
  let token = localStorage.getItem("token");
  let decoded = jwtDecode(token);

function getAllReservations(){
    try {
      axios
      .get("http://localhost:8000/reservations")
      .then((res) => {
        setReservations(res.data);
        console.log (`getAllreservations`, reservations)
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReservations();
  }, []);

console.log ("office and offices ",  offices)

async function deleteReservation(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonColor: "#49be25",
    cancelButtonColor: "#be4d25",
    confirmButtonText: "Yes!",
    cancelButtonText:"No",
  }).then((result) => {
    if (result.isConfirmed) { 
      try {
        axios.delete(`http://localhost:8000/${id}`)
        .then(() => {
           getAllReservations();
        })
       
      } catch (error) {
        console.log("delete product", error);
      }
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        confirmButtonColor:"#B45931ff",
      });
    }
  });
};
    return ( 
      <div className='profilMainContainer'>
        <div>
            <h2 className='reservationTitle'>Your reservations</h2>
<div className='mainReservationContainer'>
{reservations
    .filter( (reservation) => reservation.userId === decoded.id).map ((user,i) => (
              <div
              className='reservationContainer'
              key= {i}>
                <div className='containerTextInfo'>
               <h4>You will be in <span>{user.officePlace}</span></h4>
              <h4> the following days:<span className="reservationDates">{(user.dates).map((date) => (
                (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(date)) + "  ") )} </span></h4>
                </div>
                <button 
                className="deleteButReservation" 
                title="delete the item" 
                onClick={() =>deleteReservation(user._id)}><i className="material-icons delete_foreverIcon">delete_forever</i></button>
                </div>
            ))}</div>
        </div>
        <div>
            <h2>Your offices</h2>
</div>
        <div  className='mainProfilOfficesContainer'>
{offices
    .filter( (office) => office.owner._id === decoded.id).map ((office,i) => (
              <div
              key= {i}>
               <div className='profilOfficeItem'> 
                  <img className='profilImageOffice' src ={office.photo}></img>
                  <div>
                    <span>{office.place}</span> 
                    </div>
                  </div>
                <div>
              
               </div>
                </div>  
            ))}</div>
      </div>
       
       
     );
}

export default Profil ;