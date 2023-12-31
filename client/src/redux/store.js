import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import Reducer from './reducer';
import thunk from 'redux-thunk';


const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;
