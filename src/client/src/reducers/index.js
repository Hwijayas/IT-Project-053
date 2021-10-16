import userReducer from './userReducer';
import dealReducer from "./dealReducer"
import adminReducer from "./adminReducer"
import customerReducer from "./customerReducer"
import {combineReducers} from 'redux';
const rootReducer = combineReducers({
    userReducer,dealReducer,adminReducer, customerReducer,
});
export default rootReducer;
