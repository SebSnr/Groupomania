import React from "react"
// component
import Navigation from "../components/Navigation"
import ProfileBar from "../components/ProfileBar"

export default function ProfilePage() {
	return (
		<React.Fragment>
			<Navigation />
			<main className="container gx-0">
					<h1 className="d-none">Profil user</h1>
					<ProfileBar />
			</main>
		</React.Fragment>

	)
}
