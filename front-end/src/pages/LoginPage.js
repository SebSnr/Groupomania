import React, {useState} from "react"
import Lottie from "lottie-react"
// Components
import Connexion from "../components/Connexion"
import SocialBar from "../components/SocialBar"
import globalWorld from "../assets/11420-travel-icons-world.json"

export default function LoginPage() {

	// loader animation before render
	const [loading, setLoading] = useState(true)
	setTimeout(() => {
		setLoading(false)
	}, 1300)

	return (
		<React.Fragment>
			{loading ? (
				<Lottie animationData={globalWorld} options={{loop: true, autoplay: true}} height={60} width={60} style={{"background": "none", "height": "100vh"}} />
			) : (
				<div className="card shadow container loginContainer">
					<div className="loginContainer__header">
						<h1>
							Bienvenue à la communauté<span className="d-none">Groupomania</span>
						</h1>
						<br />
						<img src="/img/groupomania transparent.png" alt="Logo Groupomania" className="img-fluid mx-auto" />
					</div>
					<Connexion />
					<SocialBar />
				</div>
			)}
		</React.Fragment>
	)
}
