import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";
import MarkerLeaft from "./MarkerLeaft";
import { useCiteies } from "./contexts/CitesContext";
import { useEffect, useState } from "react";
import { useGeolocation } from "./hooks/useGeolocation";
import Button from "./Button";

function Map() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const {
    isLoading: geoLoacationIsLoading,
    position: geoLocationPosition,
    error: geoLocationError,
    getPosition,
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState([50, 1]);
  const { cities } = useCiteies();

  useEffect(
    function () {
      if (lat && lng) setMapPosition([+lat, +lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geoLocationPosition)
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );
  console.log("geoLocationPosition", geoLocationPosition);
  console.log("pos", mapPosition);
  return (
    <>
      <div className={styles.mapContainer}>
        {!geoLocationPosition && (
          <Button type="position" onClick={() => getPosition()}>
            {geoLoacationIsLoading ? "Loading..." : "Use Your position"}
            {geoLocationError &&!geoLoacationIsLoading ? geoLocationError : ""}
          </Button>
        )}
        <MapContainer
          className={styles.map}
          center={mapPosition}
          zoom={8}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />

          {cities.map((city) => (
            <MarkerLeaft city={city} key={city.id} />
          ))}
          <ChangeCenter position={mapPosition} />
          <DetecClick />
        </MapContainer>
      </div>
    </>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetecClick({ position }) {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      console.log(e);
      navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
