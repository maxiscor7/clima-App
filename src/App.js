
import './App.css';
import { Provider } from 'react-redux';
import generateStore from './redux/store';
import Inicio from './components/Inicio';




function App() {
  const store = generateStore()
  
  return (
    <div>
    <Provider store={store}>
     <Inicio/>
    </Provider>
    </div>
  );
}

export default App;
