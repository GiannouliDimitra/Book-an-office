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
          <div>
            <img className="itemImage" src={office.photo}/>
          </div>
          <h3>{office.place}</h3>
          <span>{office.location}</span>
          <h4>{office.price} euro/day</h4>
          <button onClick={() =>deleteOffice(office._id)}>DELETE</button>
          <button onClick={() =>editOffice(office._id)}>UPDATE</button>
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