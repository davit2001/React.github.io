import itemReducer from '../reducers/itemReducer'
import laptopReducer from '../reducers/LaptopReducer'
import {combineReducers} from 'redux'

const allReducer = combineReducers({
    phone: itemReducer,
    laptop: laptopReducer
})

export default allReducer;