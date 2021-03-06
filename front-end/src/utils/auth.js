// utils
import {toDataURL} from "./toDataURL"

export let initialAuth = {}

// set timeout local storage 
const hours = 2
let saved = localStorage.getItem('savedAt')

if (saved && (new Date().getTime() - saved > hours * 60 * 60 * 1000)) {
	localStorage.clear()
	initialAuth = {
		isAuthenticated: false,
		isAdmin: false,
		user: null,
		token: null,
	}
} else if (JSON.parse(localStorage.getItem("isAuthenticated")) === true) { // Init initialAuth if already user in local storage
	initialAuth = {
		user: JSON.parse(localStorage.getItem("user")),
		token: JSON.parse(localStorage.getItem("token")),
		firstName: JSON.parse(localStorage.getItem("firstName")),
		lastName: JSON.parse(localStorage.getItem("lastName")),
		email: JSON.parse(localStorage.getItem("email")),
		photo: JSON.parse(localStorage.getItem("photo")),
		isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")),
		isAdmin: JSON.parse(localStorage.getItem("isAdmin")),
	}
} else {
	localStorage.clear()
	initialAuth = {
		isAuthenticated: false,
		isAdmin: false,
		user: null,
		token: null,
	}
}

// Action to do in case of
export const AuthReducer = (authState, action) => {


	switch (action.type) {
		case "LOGIN":
			// save user data
			localStorage.setItem("user", JSON.stringify(action.payload.user))
			localStorage.setItem("token", JSON.stringify(action.payload.token))
			localStorage.setItem("firstName", JSON.stringify(action.payload.firstName))
			localStorage.setItem("lastName", JSON.stringify(action.payload.lastName))
			localStorage.setItem("email", JSON.stringify(action.payload.email))
			localStorage.setItem("isAuthenticated", JSON.stringify(action.payload.isAuthenticated))
			localStorage.setItem("isAdmin", JSON.stringify(action.payload.isAdmin))
			localStorage.setItem('savedAt', new Date().getTime())

			// save profile picture
			toDataURL(action.payload.photo).then((dataUrl) => {
				localStorage.setItem("photo", JSON.stringify(dataUrl))
			})

			return {
				...authState,
				user: action.payload.user,
				token: action.payload.token,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				email: action.payload.email,
				photo: action.payload.photo,
				isAuthenticated: action.payload.isAuthenticated,
				isAdmin: action.payload.isAdmin,
			}
		case "LOGOUT":
			localStorage.clear()
			return {
				isAuthenticated: false,
				isAdmin: false,
				user: null,
				token: null,
			}
		default:
			return authState
	}
}
