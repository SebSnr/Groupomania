import React from "react"

export default function MiniProfilePicture(props) {

	return (
		<div className="profile-picture">
			<img src={props.photo} alt="auteur" className="profile-picture__clipped"/>
		</div>
	)
}
