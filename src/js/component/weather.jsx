import React from "react";
import { useEffect, useState } from "react";

let Weather = () =>{
    const [temperature, setTemperature] = useState("")
    const [city, setCity] = useState("")
    const [wind, setWind] = useState("")
    const [description, setDescription] = useState("")
    const [fore, setFore] = useState("")
    const actualDay = new Date()
    const tomorrow  = new Date(); // The Date object returns today's timestamp
    tomorrow.setDate(tomorrow.getDate() + 1);   
    const thirdDay = new Date()
    thirdDay.setDate(thirdDay.getDate()+2)
    const actualHour = new Date()


    let takeWeatherFromApi = () =>{
        fetch('https://goweather.herokuapp.com/weather/' + city )
        .then(response => {
            if (!response.ok) {
            throw Error(response.statusText);
            }
            // Read the response as json.
            return response.json();
            })
            .then(responseAsJson => {
            setWind(responseAsJson.wind) 
            setTemperature(responseAsJson.temperature)
            setDescription(responseAsJson.description)
            let arr = []
            responseAsJson.forecast.forEach(element => {
                return arr.push(element.temperature, element.wind)
                })
            setFore(arr)
         })
        .catch(error => {
            console.log('Looks like there was a problem: \n', error);
        });
    }


       return(
       <div className="container-fluid">
            <div className="header">
                <h1 className="temperature pt-5">{temperature}</h1>
                <h4>{description}</h4>
                <h5>{actualHour.getHours().toString().padStart(2,"0")} : { actualHour.getMinutes().toString().padStart(2,"0")}</h5>
            </div> 
            <div className="body mx-3">
                <div className="d-flex align-items-center mt-5 day-box first">
                    <div><span className="city">{city} <br/> </span> {actualDay.toDateString()}</div>
                    <div className="ms-auto">{temperature}  <br/> <span className="wind">{wind}</span> </div>
                </div>
                <div className="line"></div>
                <div className="d-flex my-2  align-items-center day-box">
                    <div>{tomorrow.toDateString()}</div>
                    <div className="ms-auto">{fore[0]}<br/> <span className="wind">{fore[1]}</span></div>   
                </div>
                <div className="line"></div>
                <div className="d-flex my-2  align-items-center day-box">
                    <div>{thirdDay.toDateString()}</div>
                    <div className="ms-auto">{fore[2]} <br/> <span className="wind">{fore[3]}</span></div>
                </div>

            </div>
            <div className="footer">
                <input 
                    type="text"
                    value={city}
                    onChange={(e)=>{
                        setCity(e.target.value)
                    }}
                    placeholder="Type a city"
                    className="mb-2"
                />
                <br/>
                <button 
                    type="button"  
                    onClick={()=>{
                    takeWeatherFromApi()
                    setCity("")
                }}>Click!</button>
            </div>                
       </div>
    )
}
export default Weather;