import OfficeItem from "./OfficeItem";
import "./officeList.css";

function OfficesList ({ office, offices, getAllOffices }) {

    return ( 
        <div
        className="listMainContainer">
            {offices.map ((office,i) => (
              <div
              key= {i}>
                <OfficeItem
                office = {office}
                />
                </div>  
            ))}
        </div>
     );
}

export default OfficesList;