import React, { useContext } from "react"
import { AuthContext } from "../App"
import {NavLink} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

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
		<header className="header py-0">
			<nav className="navbar navbar-expand-lg mb-5">
				<div className="container">
					<NavLink className="navbar-brand" to="/">
						<img src="/img/icon.png" alt="Retour accueil" className="nav-logo" />
					</NavLink>
					<button
						className="navbar-toggler nav-burger-custom"
						type="button"
						data-toggle="collapse"
						data-target="#navbarResponsive"
						aria-controls="navbarResponsive"
						aria-expanded="false"
						aria-label="Toggle navigation"
						title="Toggle navigation"
					>
						☰ MENU
					</button>
					<div className="collapse navbar-collapse flex-grow-0" id="navbarResponsive">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item d-lg-none">
								<NavLink className="nav-link nav-link-custom " to="/">
									Accueil
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link nav-link-custom" to="/members">
									Membres
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link nav-link-custom" to="/profile"> 
									Profil
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link nav-link-custom" to="/login">
									Se connecter
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink onClick={() => {
									if (window.confirm("Se déconnecter ?")) handleDeconnect()	}} 
									className="nav-link nav-link-custom" to="/login"
								>
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
