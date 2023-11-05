
import "leaflet/dist/leaflet.css";
import "./map.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet" 
import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const Map = () => {

    const position = [37.9, 23.7]

    const offices = [
        {
            location: [37.91,23.71],
            name: "Office1",
            prise:10,
        },
        {
            location: [37.93,23.72],
            name: "Office2",
            prise:12,
        },
        {
            location: [37.89,23.69],
            name: "Office3",
            prise:15,
        }
    ]
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
         {offices.map ((office) => (
    <Marker position = { office.location } icon = {customIcon}>
<Popup>{ office.name } <br></br> { office.prise }</Popup>
    </Marker>
   ))}
    </MarkerClusterGroup>
      </MapContainer>
    );
  };
  
  export default Map;