import React from "react"

export default function Header() {
	return (
		<header className="header">
			<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
				<div class="container">
					<button class="navbar-brand" href="/">
						{/* <img src="/img/icon.png" alt="Bouton retour accueil" className="nav-logo" /> */}
					</button>
					<button
						class="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarResponsive"
						aria-controls="navbarResponsive"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarResponsive">
						<ul class="navbar-nav ml-auto">
							<li class="nav-item active">
								<a class="nav-link" href="b">
									Membres
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="a">
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
