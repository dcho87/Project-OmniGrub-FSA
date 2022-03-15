import { createStore, combineReducers, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import testRest from "./testRest";
import counterSlice from "./counterSlice";
import yelpSlice from "./yelpSlice";
import googleStore from "./googleStore";
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
  googleStore,
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
export * from "./googleStore";
