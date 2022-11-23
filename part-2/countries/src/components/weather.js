import { useEffect, useState } from "react"
import axios from "axios"

export const Weather = ({ country }) => {
  const [weather, setWeather] = useState([{}])
  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
    }
    axios.get('http://api.weatherstack.com/current', {params})
    .then(response => {
      console.log(response.data)
      setWeather(response.data)
    }) 
  })
  if (weather.length > 0) {
    const currentWeather = weather[0].current
    return (
      <div>
        <h1>Weather in {country.name.common}</h1>
        <p>temprature {currentWeather.temperature} Celcius</p>
        <image src={currentWeather.weather_icons[0]} alt="cloud image" ></image>
        <p>wind {currentWeather.wind_speed} m/h</p>
      </div>
    )
  }
}