import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import multi from 'redux-multi' //redux-multi middleware will dispatch array of action-creators in order

const store = createStore(rootReducer, applyMiddleware(multi, createLogger(), thunkMiddleware))

export default store
