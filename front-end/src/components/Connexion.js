import React, {useState} from "react"
import SignUpForm from "./SignUpForm"
import LoginForm from "./LoginForm"

export default function Connexion() {
	const [connexionContent, setConnexionContent] = useState()

	return (
		<div>
			{(() => {
				switch (connexionContent) {
					case "signUp":
						return (
							<div className="connexionContent">
								<SignUpForm />
								<br />
								Déjà un compte ?
								<br />
								<br />
								<button className="connexionContent__forwardButton" onClick={() => setConnexionContent("login")}>
									Se connecter
								</button>
							</div>
						)
					case "login":
						return (
							<div className="connexionContent">
								<LoginForm />
								<br />
								Créer un compte
								<br />
								<br />
								<button className="connexionContent__forwardButton" onClick={() => setConnexionContent("signUp")}>
									S'inscrire
								</button>
							</div>
						)
					default:
						return (
							<div className="connexionContent">
								<button onClick={() => setConnexionContent("signUp")}>S'inscrire</button>
								<br></br>
								ou
								<br></br>
								<br></br>
								<button onClick={() => setConnexionContent("login")}>Se connecter</button>
							</div>
						)
				}
			})()}
		</div>
	)
}
