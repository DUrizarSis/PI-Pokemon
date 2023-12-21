// import { createStore, compose, applyMiddleware } from "redux";
// import Reducer from "./reducer";
// import thunk from "redux-thunk";

// const composeDevTools = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

// const store = createStore(Reducer, composeDevTools(applyMiddleware(thunk)));

// export default store;

import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import Reducer from './reducer';
import thunk from 'redux-thunk';


const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;
