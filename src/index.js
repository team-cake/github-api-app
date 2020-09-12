import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { userReducer } from './reducer'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { watchLoadUserData } from './sagas'

// initializing saga middleware for the store
const sagaMiddleware = createSagaMiddleware()

// creating the store with our reducer
const store = createStore(
	combineReducers({
		user: userReducer,
	}),
	applyMiddleware(sagaMiddleware)
)

// triggering watchLoadUserData when there is a LOAD_USER_DATA
sagaMiddleware.run(watchLoadUserData)

// wrapping the App in a Provider to work with React and Redux
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
