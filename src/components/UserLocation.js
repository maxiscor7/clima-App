import { useEffect, useState } from "react";
import { traerDatoUsuario } from '../funciones/funcion';
import { useSelector } from "react-redux";
import { Card } from "./Card";

import rain from '../videos/Rain.mp4'
import tormenta from '../videos/Tormenta.mp4'
import nubes from '../videos/Nubes.mp4'
import nieve from '../videos/Nieve.mp4'
import neblina from '../videos/Neblina.mp4'
import sun from '../videos/Sun.mp4'
import moon from '../videos/Moon.mp4'

export const UserLocation = () => {
    
    const [datosUsuario, setDatosUsuario] = useState([])
    const [datosSemana, setDatosSemana] = useState([])
    const [nombrePais, setNombrePais] = useState('')
    const [iconWeather, setIconWeather] = useState('')
    const [climaWeather, setClimaWeather] = useState('')

    const paisVariable = useSelector(store => store.pais.array)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            let latitud = parseFloat(position.coords.latitude).toFixed(2)
            let longitud = parseFloat(position.coords.longitude).toFixed(2)
            traerDatoUsuario(latitud, longitud, process.env.REACT_APP_API_KEY, setDatosUsuario, setDatosSemana, setNombrePais, setClimaWeather, setIconWeather)
        })
    }, [paisVariable])


    const comprobarClima = (clima) => {
        if (clima >= 199 && clima <= 232) {
            return tormenta
        }
        else if (clima >= 300 && clima <= 531) {
            return rain
        }
        else if(clima === 771){
            return rain
        }
        else if (clima >= 600 && clima <= 622) {
            return nieve
        }
        else if (clima >= 701 && clima <= 762) {
            return neblina
        }
        else if (clima === 800 && iconWeather === '01d') {
            return sun
        }
        else if (clima === 800 && iconWeather === '01n') {
            return moon
        }
        else if (clima > 800) {
            return nubes
        }
    }

    

    let hoy = new Date();
    let hora = hoy.getHours()
    let minutos = hoy.getMinutes()
    let min = ''
    if (minutos < 10) { min = '0' + minutos } else { min = minutos }
    let fecha = hoy.getDate()
    let day = hoy.getDay()

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



    return (

        <div className="conteiner-pri">



            <div className="conteiner-leftSide">


                {datosUsuario.current !== undefined ? (


                    <div className={`${iconWeather} container-user-dates`}>
                        <video src={comprobarClima(climaWeather)} autoPlay loop muted />

                        <div className="title-country">
                            <h1>{`${nombrePais[1]}, ${nombrePais[2]}`}</h1>
                        </div>

                        <div className="container-weather-and-date">

                            <div className="container-weather">

                                <div className="description">
                                    <h3>{datosUsuario.current.weather[0].description}</h3>
                                </div>
                                <div className="conteiner-img-temp">
                                    <img src={`http://openweathermap.org/img/wn/${datosUsuario.current.weather[0].icon}@2x.png`} alt='' />
                                    <h4 className='simbolo-temp'><strong>{Math.round(datosUsuario.current.temp)}</strong></h4>
                                    <p><strong> ºC | ºF</strong></p>
                                </div>
                                <div className="container-hum-wind">
                                    <h3>{`Humedad: ${datosUsuario.current.humidity} %`}</h3>
                                    <h3>{`Viento a: ${datosUsuario.current.wind_speed} km/h`}</h3>
                                </div>

                            </div>
                            <div className="container-date">
                                <h2>{`${diaDeMañana(day)} ${fecha}`}</h2>
                                <p>{`${hora} : ${min}`}</p>

                            </div>

                        </div>

                        <div className="container-all-weekend">
                            {datosSemana.map((e, index) => {
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



            <div className="conteiner-rightSide">
                {paisVariable.length > 0 ? (
                    paisVariable.map((e, index) => {
                        return (
                            <div key={index}>
                                <Card
                                    name={e.name}
                                    max={Math.round(e.main.temp_max)}
                                    min={Math.round(e.main.temp_min)}
                                    icon={e.weather[0].icon}
                                    id={e.id}
                                    latitud={e.coord.lat}
                                    longitud={e.coord.lon}

                                />
                            </div>
                        )
                    })
                ) : ''}
            </div>


        </div>
    )
}