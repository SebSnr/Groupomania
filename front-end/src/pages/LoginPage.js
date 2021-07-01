import React from "react"
import Connexion from "../components/Connexion"
import SocialBar from "../components/SocialBar"

export default function LoginPage () {
	return (
		// <div className="loginContainer container card">
		<div className ="card shadow container loginContainer col-12">
			<div className="loginContainer__header">
				{/* <img src="/img/icon-left-font.svg" alt="Logo Groupomania" /> */}
				<h1>Bienvenue à la communauté</h1>
				<br />
				<img src="/img/groupomania transparent.png" alt="Logo Groupomania" className="img-fluid mx-auto" />
			</div>
			<Connexion />
			{/* connexionContent={connexionContent} setConnexionContent={setConnexionContent} */}
			<SocialBar />
		</div>
	)
}
