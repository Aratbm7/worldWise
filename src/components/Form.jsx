// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "./hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "./Spinner";
import Message from "./Message";
import BackButton from "./BackButton";
import { useCiteies } from "./contexts/CitesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  console.log("codePoints", codePoints);
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGetCityInfo, setIsLoadingGetCityInfo] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [emoji, setEmoji] = useState("");
  const [errorGetCityInfo, setErrorGetCityInfo] = useState("");
  const { cerateNewCity } = useCiteies();

  const { lat, lng } = useUrlPosition();

  const navigator = useNavigate();

  useEffect(
    function () {
      async function getCityInfo() {
        try {
          setIsLoadingGetCityInfo(true);
          setErrorGetCityInfo("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          console.log("data", data);
          if (!data.countryCode)
            throw new Error(
              "There is no city's name please click some where on map! 🤠"
            );
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setCountryCode(data.countryCode);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          setErrorGetCityInfo(error.message);
        } finally {
          setIsLoadingGetCityInfo(false);
        }
      }
      getCityInfo();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      countryCode,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await cerateNewCity(newCity);
    navigator("/app/cities");
  }

  if (isLoadingGetCityInfo) return <Spinner />;
  if (!countryCode) return <Message message={errorGetCityInfo} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker onChange={(date) => setDate(date)} selected={date} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        {/* <button>Add</button> */}
        <BackButton />
        <Button type="primary" onClick={handleSubmit}>
          Add
        </Button>
        {/* <button>&larr; Back</button> */}
      </div>
    </form>
  );
}

export default Form;
