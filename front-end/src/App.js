import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import MembersPage from "./pages/MembersPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={HomePage} />
				<Route path="/login" exact component={LoginPage} />
				<Route path="/profile" exact component={ProfilePage} />
				<Route path="/members" exact component={MembersPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
