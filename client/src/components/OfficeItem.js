import "./officeItem.css"

function OfficeItem ( { office }) {

    return ( 
      <div className="ItemContainer">
    <div> <img className="itemImage" src={office.photo}/>
    </div>
        <h3>{office.name}</h3>
        <span>{office.location}</span>
        <h4>{office.price} euro/day</h4>
      </div>  
     );
}

export default OfficeItem ;