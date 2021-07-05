import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import MembersPage from "./pages/MembersPage";
import NotFoundPage from "./pages/NotFoundPage";

export const AuthContext = React.createContext()

const initialState = {
	isAuthentificated: true,
	user: null,
	token: null,
	test: "le test fonctionne"
}

const reducer = (state, action) => {
	switch (action.type) {
		case "login":
			localStorage.setItem("user", JSON.stringify(action.payload.user));
      		localStorage.setItem("token", JSON.stringify(action.payload.token));
     	return {
			...state,
			isAuthenticated: true,
			user: action.payload.user,
			token: action.payload.token
      };
		case "LOGOUT":
			localStorage.clear();
			return {
				...state,
				isAuthenticated: false,
				user: null
			};
		default:
			return state;
  	}
}


function App() {

	const [state, dispatch] = React.useReducer(reducer, initialState)


	return (
		<AuthContext.Provider
      value={{
        state,
        dispatch
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
	);
}

export default App;
