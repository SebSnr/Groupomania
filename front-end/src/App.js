import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import MembersPage from "./pages/MembersPage"
import NotFoundPage from "./pages/NotFoundPage"
import ArticlePage from "./pages/ArticlePage"

// Create a useContext of authentication data
export const AuthContext = React.createContext()

// Init initialAuth case if already a user in local storage or not
 export let initialAuth = {}

if (JSON.parse(localStorage.getItem("isAuthenticated")) === true) {
	// console.log(JSON.parse(localStorage.getItem("user"))) // a supp

	initialAuth = {
		user: JSON.parse(localStorage.getItem("user")),
		token: JSON.parse(localStorage.getItem("token")),
		firstName: JSON.parse(localStorage.getItem("firstName")),
		lastName: JSON.parse(localStorage.getItem("lastName")),
		photo: JSON.parse(localStorage.getItem("photo")),
		isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")),
		isAdmin: JSON.parse(localStorage.getItem("isAdmin")),
	}
} else {
	initialAuth = {
		isAuthenticated: false,
		isAdmin: false,
		user: null,
		token: null,
	}
}

// store profile picture from db to local storage
const toDataURL = url => fetch(url)
.then(response => response.blob())
.then(blob => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onloadend = () => resolve(reader.result)
  reader.onerror = reject
  reader.readAsDataURL(blob)
}))

// Action to do in case of
const AuthReducer = (authState, action) => {
	switch (action.type) {
		case "LOGIN":
			// save user data
			localStorage.setItem("isAuthenticated", JSON.stringify(action.payload.isAuthenticated))
			localStorage.setItem("isAdmin", JSON.stringify(action.payload.isAdmin))
			localStorage.setItem("user", JSON.stringify(action.payload.user))
			localStorage.setItem("token", JSON.stringify(action.payload.token))
			localStorage.setItem("firstName", JSON.stringify(action.payload.firstName))
			localStorage.setItem("lastName", JSON.stringify(action.payload.lastName))
			
			// save profile picture
			toDataURL(action.payload.photo)
			.then(dataUrl => {
				console.log('RESULT:', dataUrl)
				localStorage.setItem("photo", JSON.stringify(dataUrl))
				})
			
			console.log("ca login dans la app") // a suppp
			// console.log(action.payload)  // a suppp
			
			return {
				...authState,
				isAuthenticated: action.payload.isAuthenticated,
				isAdmin: action.payload.isAdmin,
				user: action.payload.user,
				token: action.payload.token,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				photo: action.payload.photo,
			}
		case "LOGOUT":
			localStorage.clear()
			return {
				...authState,
				isAuthenticated: false,
				isAdmin: false,
				user: null,
			}
		default:
			return authState
	}
}

function App() {
	const [AuthState, dispatchAuthState] = React.useReducer(AuthReducer, initialAuth)

	return (
		<AuthContext.Provider
			value={{
				AuthState,
				dispatchAuthState,
			}}
		>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/login" exact component={LoginPage} />
					<Route path="/articles/" exact component={ArticlePage} />
					<Route path="/profile" exact component={ProfilePage} />
					<Route path="/members" exact component={MembersPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</BrowserRouter>
		</AuthContext.Provider>
	)
}

export default App
