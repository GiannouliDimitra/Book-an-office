import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"; 
import axios from 'axios';
import Footer from "./Footer";

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
    return ( 
      <div>
        <div>
            <h2>Your reservations</h2>
<div>
{reservations
    .filter( (reservation) => reservation.userId === decoded.id).map ((user,i) => (
              <div
              key= {i}>
                <div>
               <span>{user.officePlace}</span>
               </div>
               <div>
              <span>{(user.dates).map ((date) => (
                (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(date)) + " and... ") )} </span>
               </div>
                </div>  
            ))}</div>
        </div>
        <div>
            <h2>Your offices</h2>
</div>
        <div>
{offices
    .filter( (office) => office.owner._id === decoded.id).map ((office,i) => (
              <div
              key= {i}>
                <div>
               <span>{office.price}</span>
               </div>
               <div>
               <span>{office.place}</span>
               </div>
                </div>  
            ))}</div>
<Footer/>
      </div>
       
       
     );
}

export default Profil ;