import React, {useContext} from "react"
import {NavLink} from "react-router-dom"
import {useHistory} from "react-router"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
// components
import {AuthContext} from "../App"
// utils
import { alertSuccessMessage } from "../utils/alertMessage"

export default function Navigation() {
	
	const {dispatchAuthState} = useContext(AuthContext) // dispatch action and state of authentication
	const history = useHistory() // use history hook
	const MySwal = withReactContent(Swal) // custom alert button

	// launch Disconnect action
	const handleDeconnect = () => {
		dispatchAuthState({
			type: "LOGOUT",
		})
		history.push("/")
		alertSuccessMessage("Vous êtes déconnecté", 1000)
	}

	return (
		<header className="header shadow py-0">
			<nav className="navbar navbar-expand-lg mb-4">
				<div className="container">
					<NavLink className="navbar-brand d-none d-lg-block" to="/" title="Retour accueil">
						<img src="/img/icon.png" alt="Retour accueil" className="navbar-brand__logo" />
					</NavLink>
					<button className="nav-btn-icon d-lg-none my-2" onClick={() => history.goBack()} title="revenir en arrière">
						<img src="/img/previous-icon.svg" alt="Precedent" className="nav-svg-icon" />
					</button>
					<button
						className="navbar-toggler nav-burger--custom"
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
								<NavLink className="nav-link nav-link--custom " to="/">
									Accueil
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link nav-link--custom d-lg-none" to="/members">
									Membres
								</NavLink>
							</li>
							<li className="nav-item d-lg-none">
								<NavLink className="nav-link nav-link--custom" to="/profile">
									Profil
								</NavLink>
							</li>
							<li className="nav-item">
								<button
									onClick={() => {
										// ask confirmation
										MySwal.fire({
											title: "Se déconnecter ?",
											timer: 5000,
											showCancelButton: true,
											confirmButtonText: "Oui",
											cancelButtonText: "Non",
											buttonsStyling: false,
											customClass: {
												confirmButton: "btn btn-danger mx-3",
												cancelButton: "btn btn-primary mx-3",
												title: "h4 font",
												popup: "card",
											}
										}).then((result) => {
											if (result.isConfirmed) {
												handleDeconnect()
											} else return
										}) 
									}}
									className="nav-btn-icon"
									title="Se deconnecter"
								>
									<img src="/img/logout.svg" className="nav-svg-icon my-2" alt="Se deconnecter"></img>
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}
