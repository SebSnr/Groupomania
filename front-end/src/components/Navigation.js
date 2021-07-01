import React from "react"

export default function Navigation() {
	return (
		<header className="header">
			<nav className="navbar navbar-expand-lg navbar-dark mb-5">
				<div className="container">
					<button className="navbar-brand" href="/">
						<img src="/img/icon.png" alt="Bouton retour accueil" className="nav-logo " />
					</button>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarResponsive"
						aria-controls="navbarResponsive"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarResponsive">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<a className="nav-link" href="b">
									Membres
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="a">
									Profil
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}
