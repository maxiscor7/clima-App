import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { traerDatoUsuario } from "../funciones/funcion";

import rain from '../videos/Rain.mp4'
import tormenta from '../videos/Tormenta.mp4'
import nubes from '../videos/Nubes.mp4'
import nieve from '../videos/Nieve.mp4'
import neblina from '../videos/Neblina.mp4'
import sun from '../videos/Sun.mp4'
import moon from '../videos/Moon.mp4'


export const City = () => {

  const params = useParams()
  const latLong = params.id.split('&')
  const [datosCity, setDatosCity] = useState([])
  const [datosSemanaCity, setDatosSemanaCity] = useState([])
  const [nombreCity, setNombreCity] = useState('')
  const [iconWeather, setIconWeather] = useState('')
  const [climaWeather, setClimaWeather] = useState('')


  const apiKey = '4ae2636d8dfbdc3044bede63951a019b';

  let hoy = new Date();

  let localTime = hoy.getTime()
  let localOffset = hoy.getTimezoneOffset() * 60000
  let utc = localTime + localOffset
  let ciudad = utc + (1000 * datosCity.timezone_offset)
  let nd = new Date(ciudad)

  let hora = nd.getHours()
  let minutos = nd.getMinutes()
  let min = ''
  if (minutos < 10) { min = '0' + minutos } else { min = minutos }
  let fecha = nd.getDate()
  let day = nd.getDay()
  useEffect(() => {

    traerDatoUsuario(latLong[0], latLong[1], apiKey, setDatosCity, setDatosSemanaCity, setNombreCity, setClimaWeather, setIconWeather)
  }, [])
  


  const fechaDeManana = (dia) => {
    if (dia < 6) {
      return dia
    } else {
      day = 0
      return dia
    }
  };

  const diaDeMañana = (d) => {
    let days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    days.forEach((element, index) => {
      if (index === d) {
        d = element
      }
    })
    return d
  }

  const comprobarClima = (clima) => {
    if(clima >= 199 && clima <= 232 ){
      return tormenta
    }
    else if(clima >= 300 && clima <= 531) {
      return rain
    }
    else if(clima === 771){
      return rain
    }
    else if(clima >=600 && clima <=622){
      return nieve
    }
    else if(clima >= 701 && clima <= 762){
      return neblina
    }
    else if(clima === 800 && iconWeather === '01d'){
      return sun
    }
    else if(clima === 800 && iconWeather === '01n'){
      return moon
    }
    else if(clima > 800){
      return nubes
    }
  }

  return (
    <div className="conteiner-pri">
      {datosCity.current !== undefined ? (
        <div className='container-user-dates'>
          <video src={comprobarClima(climaWeather)} autoPlay loop muted />


          <div className="title-country">
            <h1>{`${nombreCity[0]}, ${nombreCity[1]}`}</h1>
          </div>

          <div className="container-weather-and-date">

            <div className="container-weather">

              <div className="description">
                <h3>{datosCity.current.weather[0].description}</h3>
              </div>
              <div className="conteiner-img-temp">
                <img src={`http://openweathermap.org/img/wn/${datosCity.current.weather[0].icon}@2x.png`} alt='' />
                <h4 className='simbolo-temp'><strong>{Math.round(datosCity.current.temp)}</strong></h4>
                <p><strong> ºC | ºF</strong></p>
              </div>
              <div className="container-hum-wind">
                <h3>{`Humedad: ${datosCity.current.humidity} %`}</h3>
                <h3>{`Viento a: ${datosCity.current.wind_speed} km/h`}</h3>
              </div>

            </div>
            <div className="container-date">
              <h2>{`${diaDeMañana(day)} ${fecha}`}</h2>
              <p>{`${hora} : ${min}`}</p>

            </div>

          </div>

          <div className="container-all-weekend">
            {datosSemanaCity.map((e, index) => {
              return (
                <div className="conteiner-weekend-img-min-max" key={index}>
                  <h4>{diaDeMañana(fechaDeManana(day++))}</h4>
                  <img src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`} alt='' />
                  <div className="conteiner-wekend-tems">
                    <p style={{ color: "red" }}><strong>{Math.round(e.temp.max)} º</strong></p>
                    <p>/</p>
                    <p style={{ color: "rgb(9, 154, 183)" }}><strong>{Math.round(e.temp.min)} º</strong></p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      ) : ''}
    </div>
  )
}