import userReducer from './userReducer';
import dealReducer from "./dealReducer"
import {combineReducers} from 'redux';
const rootReducer = combineReducers({
    userReducer,dealReducer,
});
export default rootReducer;
