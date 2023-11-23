import { useState } from 'react';
import OfficeItem from "./OfficeItem";
import Map from "./Map";
import "./officeList.css";

function OfficesList ({ office, offices, setOffice, getAllOffices }) {
    //states
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOffices = offices.filter((office) => {
        return office.place.toLowerCase().includes(searchTerm.toLowerCase());
      });

    return ( 
      <div  className='listMainContainer'>
        <input
        id="searchInput"
          type="text"
          placeholder="Search by place.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className='renderItemsContainer'>
         <div
        className='officeRenderItem'>
            {filteredOffices.map ((office,i) => (
              <div
              key= {i}>
                <OfficeItem
                office = {office}
                offices = {offices}
                setOffice={setOffice}
                getAllOffices = {getAllOffices}
                />
                </div>  
            ))}
        </div> 
        <div className='officeRenderMap'>
        <Map 
          className='map'
               offices = {offices}/>
        </div>
      </div>
        </div>   
     );
}

export default OfficesList;