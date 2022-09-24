import { useState } from "react";
import { useDispatch } from "react-redux";
import { obtenerDatoUsuario } from "../redux/reducer";
import linkedin from '../images/linkedin.png';
import github from '../images/github.png';

export const Nav = () => {
  const dispatch = useDispatch()
  const [city, setCity] = useState('')

  const [message, setMessage] = useState('');

  const handleChange = event => {
    setMessage(event.target.value);
    setCity(event.target.value)
  };

  const handleClick = () => {
    // 👇️ clear input value
    setMessage('');
  };


  return (
    <div className="navegador">

      <div className="nav-left-side">
        <a href="/">Home</a>
      </div>

      <div className="nav-rigth-side">
        <div>

          <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(obtenerDatoUsuario(city))
            /* onSearch(city);   en vez de un onSearch hago un dispatch y hago la llamada a la api*/
          }}>
            <input
              type='text'
              placeholder='Ciudad...'
              value={message}
              onChange={handleChange}
            />

            <button onClick={handleClick} className="boton" type='submit'>Buscar</button>
          </form>
        </div>
        <div className='nav-icons'>
          <a href='https://www.linkedin.com/in/enrique-maximiliano-cornalba-1a2429184/' target='_blanck'><img src={linkedin} alt='' /></a>
          <a href='https://github.com/maxiscor7' target='_blanck'><img src={github} alt=''/></a>
        </div>

      </div>

    </div>
  )
}
export default Nav