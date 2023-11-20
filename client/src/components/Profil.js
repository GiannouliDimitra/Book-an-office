import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"; 
import axios from 'axios';

function Profil () {

const [reservations, setReservations] = useState([]);
const [userOfficesIds, setUserOfficesIds] = useState ([]);

  //variables for the token
  let token = localStorage.getItem("token");
  let decoded = jwtDecode(token);

function getAllReservations(){
    try {
      axios
      .get("http://localhost:8000/reservations")
      .then((res) => {
        console.log(res.data)
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

  function userFilter () {
    let userOfficesIds = reservations
    .filter( (reservation) => reservation.userId === decoded.id)
    setUserOfficesIds(userOfficesIds);
    console.log ("filter" , userOfficesIds);
  }

  useEffect(( )=> {userFilter()} , [decoded.id]);

    return ( 
      <div>
        <div>
            <h2>Your reservations</h2>
<div>
{userOfficesIds.map ((user,i) => (
              <div
              key= {i}>
                <div>
               <span>{user.officePlace}</span>
               </div>
               <div>
               <span>{user.dates}</span>
               </div>
                </div>  
            ))}</div>
        </div>
         <div>
         <h2>Your offices</h2>
     </div> 
      </div>
       
       
     );
}

export default Profil ;