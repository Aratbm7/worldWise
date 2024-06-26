import styles from "./CountryList.module.css";
import Spinner from "./Sidebar";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCiteies } from "./contexts/CitesContext";


function CountryList() {
  const {cities, isLoading} = useCiteies()
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="To add new city click on the map" />;

    // arr in the first is empty
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
        console.log("asdfaf",[...arr, { country: city.country, emoji: city.emoji }])
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
