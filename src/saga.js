import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'
import { actions, t } from './actions'

// the base URL for your REST API backend
const baseUrl = 'https://api.github.com/users'

// sending request with username and getting user data from GitHub
// yield is like await function
// function* creates a particular function that will remember the state of function
function* loadUserData(action) {
	const response = yield axios.get(`${baseUrl}/${action.name}`)
	// console.log('function*loadUserData -> response', response)
	yield put(actions.loadUserDataSuccess(response.data))
}

// watches for actions dispatched to the store and starts loadUserData saga
export function* watchLoadUserData() {
	yield takeLatest(t.LOAD_USER_DATA, loadUserData)
}
