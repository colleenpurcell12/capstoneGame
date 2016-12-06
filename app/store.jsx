import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import multi from 'redux-multi' //redux-multi middleware will dispatch array of action-creators in order

const middlewares = [thunkMiddleware, multi];

var environment = process.env.NODE_ENV || 'development'

if(environment === 'development') {
	middlewares.push(createLogger())
}

//const store = createStore(rootReducer, applyMiddleware(multi, createLogger(), thunkMiddleware))
const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer)

export default store
