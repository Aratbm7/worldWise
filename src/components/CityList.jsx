import styles from "./CityList.module.css";
import Spinner from "./Sidebar";
import CityItem from "./CityItem";
import Message from './Message'

function CityList({ cities, isLoading }) {
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
