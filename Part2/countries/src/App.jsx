import {useEffect, useState} from 'react'
import axios from 'axios'

const Weather = ({city}) => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const [tempdata,setTempdata] = useState(JSON.parse(`                
  {
   "lat":33.44,
   "lon":-94.04,
   "timezone":"America/Chicago",
   "timezone_offset":-18000,
   "current":{
      "dt":1684929490,
      "sunrise":1684926645,
      "sunset":1684977332,
      "temp": 19.4,
      "feels_like":292.87,
      "pressure":1014,
      "humidity":89,
      "dew_point":290.69,
      "uvi":0.16,
      "clouds":53,
      "visibility":10000,
      "wind_speed":3.13,
      "wind_deg":93,
      "wind_gust":6.71,
      "weather":[
         {
            "id":803,
            "main":"Clouds",
            "description":"broken clouds",
            "icon":"04d"
         }
      ]
    } 
  }          
  `))
  // useEffect(()=>{
  //   axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${city.capitalInfo.latlng[0]}&lon=${city.capitalInfo.latlng[1]}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${api_key}`)
  //     .then(response=>{setTempdata(response.data)})
  // },[])
  return(
    <>
      <h3>Weather in {city.capital[0]}</h3>
      temperature {tempdata.current.temp} Celsius <br/>
      <img src={`https://openweathermap.org/img/wn/${tempdata.current.weather[0].icon}@2x.png`} alt={tempdata.current.weather[0].description} /> <br/>
      wind {tempdata.current.wind_speed} m/s
    </>
  )
}

const Display = ({options, setOptions}) => {
  if (options.length>10){
    return(
      <p>
        Too many matches, specify another filter
      </p>
    )
  }
  if (options.length===1)
  {
    return(
      <>
        <h1>{options[0].name.common}</h1>
        <p>capital {options[0].capital[0]}
        <br/>
        area {options[0].area}
        </p>
        <h4>languages:</h4>
        <ul>
        {Object.values(options[0].languages).map(i=><li key={i}>{i}</li>)}
        </ul>
        <img src = {options[0].flags.png} alt = {options[0].flags.alt} width='12%'/>
        <Weather city={options[0]} />        
      </>
    )
  }

  const showoption = (i) => {
    setOptions([i])
  }
  return(
    <>
      {options.map(i=><p key={i.name.common}>{i.name.common} <button onClick={()=>showoption(i)}>show</button></p>)}
    </>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const [list, setList] = useState([])
  const [options, setOptions] = useState([])

  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response=>{setList(response.data)})
  },[])

  const handleChange = (event) => {
    setValue(event.target.value)
    setOptions(list.filter(i=>i.name.common.toLowerCase().includes(value.toLowerCase())))
  }
  return(
    <div>
      find countries: 
      <input value={value} onChange={handleChange}/>
      <Display options={options} setOptions={setOptions}/>
    </div>
  )
}

export default App