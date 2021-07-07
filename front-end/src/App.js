import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import MembersPage from "./pages/MembersPage"
import NotFoundPage from "./pages/NotFoundPage"

// Create a useContext for handle the authentification data
export const AuthContext = React.createContext()

// Init initialState case if already a user in local storage or not
let initialState = {}

if (localStorage.getItem("user")) {
	initialState = {
		isAuthenticated: true, 
		user: JSON.parse(localStorage.getItem("user")),
		token: JSON.parse(localStorage.getItem("token"))
	}

} else {
	initialState = {
		isAuthenticated: false, 
		user: null,
		token: null,
	}
}

// Action to do in case of 
const reducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			localStorage.setItem("user", JSON.stringify(action.payload.userId))
			localStorage.setItem("token", JSON.stringify(action.payload.token))
			console.log("ca login dans la app")
			console.log(action.payload)
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.userId, 
				token: action.payload.token,
			}
		case "LOGOUT":
			localStorage.clear()
			return {
				...state,
				isAuthenticated: false,
				user: null,
			}
		default:
			return state
	}
}

function App() {
	
	const [state, dispatch] = React.useReducer(reducer, initialState)

	return (
		<AuthContext.Provider
			value={{
				state,
				dispatch,
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
