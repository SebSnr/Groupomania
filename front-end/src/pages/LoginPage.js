import React from "react"
// Components
import Connexion from "../components/Connexion"
import SocialBar from "../components/SocialBar"

export default function LoginPage () {
	return (
		<div className ="card shadow container loginContainer">
			<div className="loginContainer__header">
				<h1>Bienvenue à la communauté<span className="d-none">Groupomania</span></h1>
				<br />
				<img src="/img/groupomania transparent.png" alt="Logo Groupomania" className="img-fluid mx-auto" />
			</div>
			<Connexion />
			<SocialBar />
		</div>
	)
}
