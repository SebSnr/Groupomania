import React from "react"
// components
import Navigation from "../components/Navigation"
import Members from "../components/Members"

export default function MembersPage() {
	return (
		<div>
			<Navigation />
			<div class="container">
					<h1 className="d-none">Membres collègues amis page</h1>
					<Members />
			</div>
		</div>
	)
}
