import { useReducer } from 'react';
import { firebase } from '../util/firebase';

const ADD_ROLE_REQUEST = 'ADD_ROLE_REQUEST';
const ADD_ROLE_SUCCESS = 'ADD_ROLE_SUCCESS';
const ADD_ROLE_FAILURE = 'ADD_ROLE_FAILURE';

const initialState = {
	isLoading: false,
	isSuccessful: false,
	error: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case ADD_ROLE_REQUEST:
			return { ...state, isLoading: true };
		case ADD_ROLE_SUCCESS:
			return { ...state, isLoading: false, isSuccessful: true };
		case ADD_ROLE_FAILURE:
			return { ...state, isLoading: false, error: action.payload };
		default:
			return state;
	}
};

const useAddRole = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { isLoading, isSuccessful, error } = state;

	const addRole = (email, role) => {
		dispatch({ type: ADD_ROLE_REQUEST });

		const callAddRole = firebase.functions().httpsCallable('callAddRole');

		callAddRole({ email, role })
			.then(res => {
				if (res.data.message === 'Role was added successfully') {
					dispatch({ type: ADD_ROLE_SUCCESS });
					console.log(res.data.message);
					firebase.auth().currentUser.getIdToken(true);
				}
			})
			.catch(error => {
				dispatch({ type: ADD_ROLE_FAILURE, payload: error.message });
				console.error(error.message);
			});
	};

	return { addRole, isLoading, isSuccessful, error };
};

export default useAddRole;
