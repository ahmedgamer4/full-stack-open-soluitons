import { WholeCountry } from "./components/WholeCountry"

export const Filter = ({ searchResult, setCurrentCountries }) => {
  if (searchResult.length > 10)  {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  else if (searchResult.length === 1) {
    return (
      <div>
        <WholeCountry country={searchResult[0]} />
      </div>
    )
  }
}