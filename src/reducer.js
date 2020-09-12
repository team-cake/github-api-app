import { t } from './actions'

// starting with no data
const initState = {
	user: null,
}

export const userReducer = (state = initState, action) => {
	switch (action.type) {
		// tells the store that the user data is successfully retreived
		// and no longer in the process of fetching another one on user request.
		case t.LOAD_USER_DATA_SUCCESS:
			return {
				...state,
				user: action.data,
			}

		default:
			return state
	}
}
