import { Popup, Marker } from "react-leaflet";

function MarkerLeaft({ city }) {
  return (
    <div>
      <Marker position={[city.position.lat, city.position.lng]}>
        <Popup>
          {city.emoji} <br /> {city.cityName}.
        </Popup>
      </Marker>
    </div>
  );
}

export default MarkerLeaft;
