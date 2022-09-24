import { useDispatch } from "react-redux"
import { removeCity } from '../redux/reducer'


export const Card = ({ name, max, min, icon, id, latitud, longitud }) => {

  const dispatch = useDispatch()
  return (
    <div>
      <div className="conteiner-search-city" key={id}>
        <a href={`/city/${latitud}&${longitud}`} >
          <h4>{name}</h4>
        </a>
        <button onClick={() => dispatch(removeCity(name))}>X</button>
        <hr />
        <div className="mini-conteiner-search-max-min">
          <div className="mini-min-max-container">
            <p>Max</p>
            <p style={{ color: "red" }} ><strong>{max} º</strong></p>
          </div>
          <div className="mini-min-max-container">
            <p>Min</p>
            <p style={{ color: "rgb(9, 154, 183)" }} ><strong>{min} º</strong></p>
          </div>
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        </div>
      </div>
    </div>
  )
}

