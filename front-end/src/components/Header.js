import React from "react"

export default function Header() {
	return (
		<header className="header">
			<nav className="navigation container">
				<a href="/">
					<img src="/img/icon.png" alt="Bouton retour accueil" />
				</a>

				<div className="menu-content">
					<input type="checkbox" id="menu-checkbox" class="menu-checkbox" />
					<label for="menu-checkbox" class="menu-toggle">
						<span></span>
						<span></span>
						<span></span>
					</label>

					<ul className="menu">
						<li>
							<a href="b">Membres</a>
						</li>
						<li>
							<a href="b">Profile</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	)
}
