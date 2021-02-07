import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import appReducer from "./reducers/appReducer";
import formReducer from "./reducers/formReducer";

export default createStore(combineReducers({appReducer, formReducer}), applyMiddleware(thunk));