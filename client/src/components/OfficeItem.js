import axios from "axios";
import { useState } from 'react';
import Edit from './Edit';

import "./officeItem.css";

function OfficeItem ( { office , getAllOffices}) {

  //states
  const [id, setId] = useState(1);
  const [isEdit, setIsEdit] = useState(false);

  async function deleteOffice(id) {
    const result = window.confirm("are you sure?");
    if(result){
      try {
        await axios.delete(`http://localhost:8000/${id}`);
        getAllOffices();
      } catch (error) {
        console.log("delete product", error);
      }
    }
    };

    async function editOffice(id) {

      console.log('from the button' + id);
      setId(id);
      setIsEdit(true);
      };


    return ( 
      <div>
        <div className="ItemContainer">
          <img className="itemImage item" src={office.photo}/>
          <h3 className="item">{office.place}</h3>
          <span className="item">{office.location}</span>
          <h4 className="item">{office.price} euro/day</h4>
          <div className="itemButtons">
          <button className="item" onClick={() =>deleteOffice(office._id)}>DELETE</button>
          <button className="item" onClick={() =>editOffice(office._id)}>UPDATE</button>
          </div>
          
        </div>
        {isEdit && <Edit
        office = {office}
        setIsEdit = {setIsEdit}
        getAllOffices = {getAllOffices}
        />
        }
      </div>
        
     );
}

export default OfficeItem ;