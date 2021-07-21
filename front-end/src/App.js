import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
// pages
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import MembersPage from "./pages/MembersPage"
import NotFoundPage from "./pages/NotFoundPage"
import ArticlePage from "./pages/ArticlePage"
// utils
import {initialAuth} from "./utils/auth"
import {AuthReducer} from "./utils/auth"

// store authentication data globally
export const AuthContext = React.createContext()

function App() {
	// dispatch authentication data and action
	const [AuthState, dispatchAuthState] = React.useReducer(AuthReducer, initialAuth)

	let routes

	if (AuthState.isAuthenticated) {
		routes = (
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
		)
	} else {
		routes = (
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/login" exact component={LoginPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</BrowserRouter>
		)
	}

	return (
		<AuthContext.Provider
			value={{
				AuthState,
				dispatchAuthState,
			}}
		>
			{routes}
		</AuthContext.Provider>
	)
}

export default App
