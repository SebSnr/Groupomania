import React, { useContext } from "react"
import { AuthContext } from "../App"
import {NavLink} from 'react-router-dom';

export default function Navigation() {

	// dispatch action and state of authenfication context
	const { dispatchAuthState } = useContext(AuthContext)

	const handleDeconnect = () => {
		dispatchAuthState({
			type: "LOGOUT",
		})
		window.location = ("/login")
	}



	return (
		<header className="header">
			<nav className="navbar navbar-expand-lg mb-5">
				<div className="container">
					<NavLink className="navbar-brand" to="/">
						<img src="/img/icon.png" alt="Bouton retour accueil" className="nav-logo " />
					</NavLink>
					<button
						className="navbar-toggler nav-btn-customized"
						type="button"
						data-toggle="collapse"
						data-target="#navbarResponsive"
						aria-controls="navbarResponsive"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler nav-link-customized">☰ MENU</span>
					</button>
					<div className="collapse navbar-collapse flex-grow-0" id="navbarResponsive">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<NavLink className="nav-link nav-link-customized" to="/members">
									Membres
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link nav-link-customized" to="/profile"> 
									Profil
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link nav-link-customized" to="/login">
									Se connecter
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink onClick={handleDeconnect} className="nav-link nav-link-customized" to="/login">
									Se déconnecter
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
	
}
