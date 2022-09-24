import axios from "axios"

// constantes
const initialState = {
    array: [],
    
}


const TRAER_CITY_DATA = 'TRAER_CITY_DATA'
const REMOVE_CITY = 'REMOVE_CITY'

//reducer

export default function paisReducer(state = initialState, action) {
    switch (action.type) {
        case TRAER_CITY_DATA:
            return { 
                ...state, 
                array: [...state.array, action.payload], 
                
                 }
        case REMOVE_CITY:
            return{
                ...state,
            array: state.array.filter((ciudad)=> ciudad.name !== action.payload)
            }

        default:
            return state
    }
}

//acciones

export const obtenerDatoUsuario = (ciudad) => async (dispatch, getState) => {
    try {   
            const apiKey = '4ae2636d8dfbdc3044bede63951a019b';
            const {data} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`)
            dispatch({
                type: TRAER_CITY_DATA,
                payload: data,            
            })
            
    } catch (error) {
        alert('Ciudada no encontrada')
    }
}


export const removeCity = (ciudad) => {
    return { type: REMOVE_CITY, payload: ciudad };
}

