import userReducer from './userReducer';
import dealReducer from "./dealReducer"
import adminReducer from "./adminReducer"
import {combineReducers} from 'redux';
const rootReducer = combineReducers({
    userReducer,dealReducer,adminReducer
});
export default rootReducer;
