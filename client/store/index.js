import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import testRest from './testRest'
import * as actionCreators from '../store'

const composeEnhancers = composeWithDevTools({ 
    actionCreators, 
    trace: true, 
    traceLimit: 25 
}); 

const store = createStore(testRest, composeEnhancers(
    applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
))

export default store
export * from './testRest'