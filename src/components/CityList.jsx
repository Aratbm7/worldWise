import styles from "./CityList.module.css";
import Spinner from "./Sidebar";
import CityItem from "./CityItem";
import Message from './Message'
import { useCiteies } from "./contexts/CitesContext";

function CityList() {


  const {cities, isLoading} = useCiteies()
  if (isLoading) return <Spinner />;
  if(!cities.length) return <Message message="To add new city click on the map"/>

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
