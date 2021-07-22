import React, {useContext, useState} from "react"

import ProfilePicture from "./ProfilePicture"
import {AuthContext} from "../App"
import FormModifyProfile from "./FormModifyProfile"

export default function ProfileBar() {
	// use global state of authContext
	const {AuthState} = useContext(AuthContext)

	let initialProfileRender = (
		<div
			className="card shadow d-flex flex-wrap flex-column align-items-center justify-content-between
        	flex-sm-row flex-lg-column align-items-lg-center 
        	p-3 h-100"
		>
			<div className="">
				<ProfilePicture photo={AuthState.photo} />
			</div>
			<div className="flex-grow-1 p-3 d-flex flex-wrap flex-column justify-content-around flex-sm-row flex-lg-column ">
				<h3 className="w-100 text-center">Profil</h3>
				<div>
					<div className="">{AuthState.firstName}</div>
					<div className="">{AuthState.lastName}</div>
				</div>
				<div className="d-flex align-items-center">
					<button onClick={() => handleProfileRender()} className="btn btn-link">
						Modifier
					</button>
				</div>
			</div>
		</div>
	)

	// state of profileRender
	const [profileRender, setProfileRender] = useState(initialProfileRender)

	// change render of profilBar : initial or modify
	const handleProfileRender = () => {
		setProfileRender(<FormModifyProfile setProfileRender={setProfileRender} initialProfileRender={initialProfileRender} />)
	}

	return profileRender
}
