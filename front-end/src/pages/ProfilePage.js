import React from "react"
// component
import Navigation from "../components/Navigation"
import ProfileBar from "../components/ProfileBar"

export default function ProfilePage() {
	return (
		<div>
			<Navigation />
			<div class="container">
				<div className="row">
					<h1 className="d-none">Profil user</h1>
					<ProfileBar />
				</div>
			</div>
		</div>
	)
}
