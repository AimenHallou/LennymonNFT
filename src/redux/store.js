//Imports 
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import blockchainReducer from "./blockchain/blockchainReducer";

//Blockcahin state
const rootReducer = combineReducers({
    blockchain: blockchainReducer,
  });
  

  const middleware = [thunk];
  
  const composeEnhancers = compose(applyMiddleware(...middleware));
  

  const configureStore = () => {
    return createStore(rootReducer, composeEnhancers);
  };
  
  const store = configureStore();
  
  export default store;