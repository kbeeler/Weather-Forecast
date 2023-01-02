import React, { useState, useEffect } from "react";
import Body from "./background.js";

function WeatherFetch() {
  const key = process.env.REACT_APP_API_KEY;
  const [feels_like, setFeelsLike] = useState("");
  const [mainTemp, setMainTemp] = useState("");
  const [description, setDescription] = useState("");
  const [main, setMain] = useState("");
  const [iconID, setIconID] = useState("");
  const [city, setCity] = useState("Texas");

  console.log(key);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},us&appid=${key}&units=imperial`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFeelsLike(data.main.feels_like);
        setMainTemp(data.main.temp);
        setDescription(data.weather[0].description);
        setMain(data.weather[0].main);
        setIconID(data.weather[0].icon);
      });
  }, [key, iconID, city]);

  function changeValues(event) {
    event.persist();
    let { name, type } = event.target;
    let value = type === "checkbox" ? event.target.checked : event.target.value;
    if (name === "city") setCity(value);
  }

  useEffect(() => {
    setCity(city);
  }, [city]);

  return (
    <Body weatherImage={description}>
      <p>City : {city} </p>
      <form>
        <input
          type="text"
          onChange={changeValues}
          name="city"
          autoComplete="false"
        />
      </form>

      <h1>Main Temperature : {mainTemp} Degrees Celsius</h1>
      <h1>Feels like: {feels_like} Degrees Celsius</h1>
      <h1>Weather Parameter: {main}</h1>
      <h1>Description : {description} </h1>
      <img
        alt="weather"
        src={"https://openweathermap.org/img/wn/" + iconID + "@2x.png"}
      />
    </Body>
  );
}

export default WeatherFetch;
