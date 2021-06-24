import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Members from "./pages/Members";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/login" exact component={Login} />
				<Route path="/profile" exact component={Profile} />
				<Route path="/members" exact component={Members} />
				<Route component={NotFound} />
			</Switch>
		
		</BrowserRouter>

	);
}

export default App;
