import { createStore, combineReducers, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import testRest from "./testRest";
import counterSlice from "./counterSlice";
import yelpSlice from "./yelpSlice";
import fourSlice from "./fourSlice";
import googleStore from "./googleStore";
import favoriteStore from "./favoriteStore";
import { placeSearch } from "./googleStore";
import auth from "./auth";
import flashMessage from "./flashMessage";
import * as actionCreators from "../store";

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25,
});

const reducer = combineReducers({
  testRest,
  counterSlice,
  yelpSlice,
  fourSlice,
  googleStore,
  favoriteStore,
  auth,
  flashMessage,
});

let middleware;
if (process.env.NODE_ENV === "development") {
  middleware = applyMiddleware(thunkMiddleware, loggerMiddleware);
} else {
  middleware = applyMiddleware(thunkMiddleware);
}

const store = createStore(reducer, composeEnhancers(middleware));

export default store;
export * from "./testRest";
export * from "./counterSlice";
export * from "./yelpSlice";
export * from "./fourSlice";
export * from "./googleStore";
export * from "./favoriteStore";
export * from "./auth";
export * from "./flashMessage";
