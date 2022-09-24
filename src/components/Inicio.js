import { Nav } from './Nav';

import { City } from './City';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import { UserLocation } from "./UserLocation";


const Inicio = () => {

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<UserLocation />}></Route>
        <Route path="/city/:id" element={<City/>}></Route>
      </Routes>
      
    </Router>
  )
}
export default Inicio