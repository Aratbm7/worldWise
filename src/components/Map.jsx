import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const navigator = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => navigator("form")}>
      <h1>Map</h1>
      <h2>
        Position: {lat} , {lng}
      </h2>
    </div>
  );
}

export default Map;
