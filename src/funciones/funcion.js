import axios from "axios";

export const traerDatoUsuario = async (latitud, longitud, apiKey, stateDatosUsuario, stateDatosSemana, stateNombrePais, stateClimaWeather, stateIconWeather) => {
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=metric&lang=es`)
    stateDatosUsuario(data)
    stateDatosSemana(data.daily.slice(0,7))
    stateNombrePais(data.timezone.replace('_', ' ').split('/'))
    stateClimaWeather(data.current.weather[0].id)
    stateIconWeather(data.current.weather[0].icon)
}

