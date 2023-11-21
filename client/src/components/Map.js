
import "leaflet/dist/leaflet.css";
import "./map.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet" 
import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const Map = ( { offices }) => {

    const position = [37.9, 23.7]

//icon creation
    const customIcon = new Icon ({
        iconUrl: require ("../photos/markerIcon.png"),
        iconSize: [38,38]
    });
//cluster icon creation
    const createClusterIcon = (cluster) => {
        return new divIcon({
        html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
        className:"custom-marker-cluster",
        iconSize: [30,30]
        });
    };

    return (
      <MapContainer className="mainContainer"center ={position} zoom={13}>
       <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MarkerClusterGroup
    chunkedLoading
    iconCreateFunction={createClusterIcon}
    >
         {offices.map ((office,i) => (
    <Marker key = {i} position = { office.location } icon = {customIcon}>
<Popup>{ office.name } <br></br> { office.prise }</Popup>
    </Marker>
   ))}
    </MarkerClusterGroup>
      </MapContainer>
    );
  };
  
  export default Map;