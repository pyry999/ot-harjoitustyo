import { useState, useEffect } from 'react'
import axios from 'axios'

const Button = (props) => (
    <button>
      show
    </button>
)

const CountriesShown = (props) => {
  if(props.showCountries.length == 1) {
    return (
      <div>
      {props.showCountries.map(country => 
        <h1 key={country.name.common}>{country.name.common}</h1>
        )}
        <p>capital {props.showCountries[0].capital}</p>
        <p>area {props.showCountries[0].area}</p>
        <h2>languages:</h2>
        <p>{props.showCountries[0].flag}</p>
        </div>
    )
  }
  else if(props.showCountries.length < 11) {
    return (
      <div>
      {props.showCountries.map(country => 
        <div key={country.name.common}>{country.name.common}
        < Button />
        </div>
        )}
        </div>
    )
  }
  else {
    return (
    <div>Too many matches, specify another filter</div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState(countries)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
      setShowCountries(response.data)
    })
  }, [])

  const handleShown = (event) => {
    console.log(event.target.value)
    setShowCountries(countries.filter((n) => n.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }



  return (
    <div>
      <p>find countries <input
      onChange={handleShown}
      />
      </p>
      <CountriesShown showCountries={showCountries}/>  
    </div>
  )
}

export default App;
