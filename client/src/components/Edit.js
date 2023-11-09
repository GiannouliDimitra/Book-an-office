import React from 'react';
import { useState } from 'react';
import axios from "axios";


function Edit({ office, setIsEdit, getAllOffices }) {
   //states
   const [updatedValue, setUpdatedValue] = useState({
    place: office.place,
    photo: office.photo,
    price: office.price,
    availableDates: office.availableDates,
  });


  const handleInputChange = (e) =>  {
    console.log ("it works")
    setUpdatedValue({
      ...updatedValue,
      [e.target.name]: e.target.value,
    });
    console.log(updatedValue);
  };

  function saveChanges() {
    console.log(office._id)
    try {
      axios
        .put(`http://localhost:8000/${office._id}`, {
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
  };

  return (
    <div /* key={g._id} */>
      <input
        type="text"
        name="place"
        placeholder=" place..."
        onChange={(e) => handleInputChange(e)}
        value={updatedValue.place}
      />
      <input
        type="text"
        name="photo"
        placeholder=" photo..."
        onChange={(e) => handleInputChange(e)}
        value={updatedValue.photo}
      />
      <input
        type="text"
        name="price"
        placeholder="price...."
        onChange={(e) => handleInputChange(e)}
        value={updatedValue.price}
      />
      <input
        type="text"
        name="availableDates"
        placeholder="price..."
        onChange={(e) => handleInputChange(e)}
        value={updatedValue.availableDates}
      />
      <div className="mt-2">
        <button type="submit" onClick={saveChanges}>
            Update
        </button>
        <button className="ms-2" onClick={() => setIsEdit(false)} >
 Cancel
        </button>
      </div>

    </div>
  );
}

export default Edit;