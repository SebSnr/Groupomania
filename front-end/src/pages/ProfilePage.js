import React from "react"
// component
import Navigation from "../components/Navigation"
import ProfileBar from "../components/ProfileBar"

export default function ProfilePage() {
	return (
		<div>
			<Navigation />
			<h2 className="d-none">Profil</h2>
			<ProfileBar />
		</div>
	)
}
