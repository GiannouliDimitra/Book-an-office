import { useState } from 'react';
import OfficeItem from "./OfficeItem";
import "./officeList.css";

function OfficesList ({ office, offices, getAllOffices }) {
    //states
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOffices = offices.filter((office) => {
        return office.place.toLowerCase().includes(searchTerm.toLowerCase());
      });

    return ( 
        <div>
        <input
        id="searchInput"
          type="text"
          placeholder="Search by place.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
       <div
        className="listMainContainer">
            {filteredOffices.map ((office,i) => (
              <div
              key= {i}>
                <OfficeItem
                office = {office}
                getAllOffices ={getAllOffices}
                />
                </div>  
            ))}
        </div>    
        </div>
     );
}

export default OfficesList;