import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import MembersPage from "./pages/MembersPage"
import NotFoundPage from "./pages/NotFoundPage"

// Create a useContext of authentication data
export const AuthContext = React.createContext()

// Init initialAuth case if already a user in local storage or not
let initialAuth = {}

if (localStorage.getItem("user")) {

	console.log(JSON.parse(localStorage.getItem("user"))) // a supp
	
	initialAuth = {
		isAuthenticated: true, 
		user: JSON.parse(localStorage.getItem("user")),
		token: JSON.parse(localStorage.getItem("token")),
		userFirstName: JSON.parse(localStorage.getItem("userFirstName")),
		userLastName: JSON.parse(localStorage.getItem("userLastName")),
		userPicture: JSON.parse(localStorage.getItem("userPicture")),
	}

} else {

	console.log(JSON.parse(localStorage.getItem("user"))) // a supp
	
	initialAuth = {
		isAuthenticated: false, 
		user: null,
		token: null,
	}
}

// Action to do in case of 
const AuthReducer = (authState, action) => {
	switch (action.type) {
		case "LOGIN":
			localStorage.setItem("user", JSON.stringify(action.payload.userId))
			localStorage.setItem("token", JSON.stringify(action.payload.token))
			localStorage.setItem("userFirstName", JSON.stringify(action.payload.userFirstName))
			localStorage.setItem("userLastName", JSON.stringify(action.payload.userLastName))
			localStorage.setItem("userPicture", JSON.stringify(action.payload.userPicture))
			console.log("ca login dans la app")
			console.log(action.payload)
			return {
				...authState,
				isAuthenticated: true,
				user: action.payload.userId, 
				token: action.payload.token,
			}
		case "LOGOUT":
			localStorage.clear()
			return {
				...authState,
				isAuthenticated: false,
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
					<Route path="/profile" exact component={ProfilePage} />
					<Route path="/members" exact component={MembersPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</BrowserRouter>
		</AuthContext.Provider>
	)
}

export default App
