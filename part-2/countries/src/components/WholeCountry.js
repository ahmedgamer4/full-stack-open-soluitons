import { Weather } from "./weather"

export const WholeCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>{country.capital}</p>
        <p>{country.area}</p>
      </div>
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(element => 
            <li>{element}</li>    
          )}
        </ul>
      </div>
      <img src={country.flag} alt="flag"></img>
      <Weather country={country} />
    </div>
  )
}